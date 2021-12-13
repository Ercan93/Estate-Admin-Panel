<template>
  <div class="container mx-0 px-0">
    <div>
      <h4>Select Location</h4>
    </div>
    <GmapMap :center="origin" @click="onMapClick" :zoom="15" style="width: 100%; height: 400px">
      <DirectionsRenderer
        travelMode="DRIVING"
        :origin="origin"
        :destination="destination"
      />
    </GmapMap>
    <b-alert
      class="d-flex flex-wrap align-items-center my-3 text-black-50"
      variant="info"
      show
    >
      <p class="h4 mr-5 font-weight-bolder">DRIVING</p>
      <p class="h5 mr-5">Duration: {{ durationString }}</p>
      <p class="h5 mr-5">Distance: {{ distance }}</p>
      <p class="h5 mr-5">Leaving: {{ leaving }}</p>
      <p class="h5 mr-5">Arrival: {{ arrival }}</p>
    </b-alert>
  </div>
</template>

<script>
import DirectionsRenderer from './DirectionsRenderer.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GoogleMap',
  props: ['defaultValues'],
  components: {
    DirectionsRenderer
  },
  data () {
    return {
      origin: {
        lat: 51.729157,
        lng: 0.478027
      },
      destination: null,
      tempDestination: null,
      duration: '0',
      distance: '0',
      leaving: '',
      arrival: '',
      time: '',
      proxy: ''
    }
  },
  watch: {
    defaultValues: {
      immediate: true,
      handler (value) {
        this.duration = value.duration
        this.distance = value.distance
        this.leaving = value.leaving
        this.arrival = value.arrival
      }
    },
    currentTime: {
      immediate: true,
      handler (value) {
        this.time = value
        if (this.duration) this.setLeavingAndArrivalTime()
      }
    },
    duration: {
      immediate: true,
      handler (value) {
        value = parseInt(value / 60)
        this.durationString = parseInt(value / 60) + ' hour ' + parseInt(value % 60) + ' minutes'
      }
    }
  },
  created () {
    this.proxy = process.env.VUE_APP_PROXY_URL
  },
  computed: {
    ...mapGetters({
      currentTime: 'timeGetter',
      postcode: 'addressGetter'
    })
  },
  methods: {
    ...mapActions(['setAppointment']),

    /**
     * @description After taking the appointment time and converting
     * it to minutes, it sets the time of leaving from the office
     * and the time of arrival at the office.
     */
    setLeavingAndArrivalTime () {
      var appointmentTime = this.time
      appointmentTime = appointmentTime.split(':')
      // appointmentTime ==> [hour, minute]
      const totalMinute = parseInt(appointmentTime[0] * 60) + parseInt(appointmentTime[1])
      const totalDrivingMinutes = parseInt(this.duration / 60)

      const leavingTheOffice = totalMinute - totalDrivingMinutes
      const arrivalAtTheOffice = totalMinute + 60 + totalDrivingMinutes

      const leavingHour = parseInt(leavingTheOffice / 60)
      let leavingMinute = leavingTheOffice % 60

      const arrivalHour = parseInt(arrivalAtTheOffice / 60)
      let arrivalMinute = arrivalAtTheOffice % 60

      if (leavingMinute < 10) leavingMinute = '0' + leavingMinute
      if (arrivalMinute < 10) arrivalMinute = '0' + arrivalMinute

      this.leaving = leavingHour + ':' + leavingMinute
      this.arrival = arrivalHour + ':' + arrivalMinute
      this.setAppointment({ leaving: this.leaving, arrival: this.arrival })
    },

    /**
     * @description It determines the distance and duration based
     * on the coordinate values of the two locations and calls
     * the setLeavingAndArrivalTime function if duration and distance are available.
     */
    getDuration () {
      const distanceURL =
        'https://maps.googleapis.com/maps/api/distancematrix/json?'
      const url = `${this.proxy}${distanceURL}origins=${this.origin.lat},${this.origin.lng}&destinations=${this.destination.lat},${this.destination.lng}&key=${process.env.VUE_APP_MAP_API_KEY}`
      var vm = this
      var config = {
        url,
        method: 'GET'
      }

      this.axios(config)
        .then((response) => {
          const elements = response.data.rows[0].elements[0]
          vm.duration = elements.duration.value + 60
          vm.distance = elements.distance.text
          vm.setLeavingAndArrivalTime()
          vm.setAppointment({
            duration: vm.duration,
            distance: vm.distance
          })
        })
        .catch((error) => {
          alert(error)
        })
    },

    /**
     * @description It checks whether there is a post code
     * according to the location information selected from the map,
     * and calls the getDuration function if the postcode is available.
     */
    addressControl () {
      let url = 'https://api.postcodes.io/postcodes?'
      url = `${this.proxy}${url}lon=${this.tempDestination.lng}&lat=${this.tempDestination.lat}`
      var vm = this
      const config = {
        url,
        method: 'GET'
      }

      this.axios(config)
        .then((response) => {
          vm.destination = vm.tempDestination
          vm.getDuration()
        })
        .catch((error) => {
          this.$bvToast.toast('Address not found.', {
            title: 'Opss!',
            variant: 'danger',
            toaster: 'b-toaster-top-full',
            solid: true
          })
          console.log(error)
        })
    },

    /**
     * @description Checks that the postcode is registered in United Kingdom.
     * @return {Boolean}
     */
    async checkPostcode () {
      const url = `${this.proxy}https://api.postcodes.io/postcodes/${this.postcode}`
      const config = {
        url,
        method: 'GET'
      }
      var result = false
      await this.axios(config)
        .then((response) => {
          this.$bvToast.toast('Postcode is correct.', {
            title: 'Heey!',
            variant: 'success',
            toaster: 'b-toaster-top-full',
            solid: true
          })
          result = true
        })
        .catch((error) => {
          this.$bvToast.toast('Invalid postcode!', {
            title: 'Opss!',
            variant: 'danger',
            toaster: 'b-toaster-top-full',
            solid: true
          })
          console.log(error)
          result = false
        })
      return result
    },

    /**
     * @description It works when clicking any point on 
     * the map and gets the coordinate values of the point 
     * first checks the postcode then calls the addressControl function.
     * @param {Object} event
     */
    onMapClick (event) {
      this.tempDestination = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.checkPostcode().then(result => {
        this.addressControl()
      })
    }
  }
}
</script>
