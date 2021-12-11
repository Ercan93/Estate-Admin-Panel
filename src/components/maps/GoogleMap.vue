<template>
  <div class="container mx-0 px-0">
    <div>
      <h4>Search Location</h4>
      <div class="d-flex flex-wrap justify-content-between">
        <GmapAutocomplete
          class="col-12 col-lg-10 mt-1"
          @place_changed="setPlace"
        />
        <button
          class="col-3 col-lg-2 btn btn-secondary mt-1"
          type="button"
          @click.prevent="addMarker"
        >
          Add
        </button>
      </div>
    </div>
    <br />
    <GmapMap :center="origin" :zoom="12" style="width: 100%; height: 400px">
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
      <p class="h5 mr-5">Duration: {{ duration }}</p>
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
  props: ['addressValue', 'durationValue', 'distanceValue'],
  components: {
    DirectionsRenderer
  },
  data () {
    return {
      currentPlace: null,
      origin: {
        lat: 51.729157,
        lng: 0.478027
      },
      destination: null,
      duration: '0',
      distance: '0',
      leaving: '',
      arrival: '',
      destinationPostcode: null,
      proxy: ''
    }
  },
  watch: {
    durationValue: {
      immediate: true,
      handler (value) {
        this.duration = value
      }
    },
    distanceValue: {
      immediate: true,
      handler (value) {
        this.distance = value
      }
    }
  },
  created () {
    this.proxy = process.env.VUE_APP_PROXY_URL
  },
  methods: {
    ...mapGetters(['timeGetter']),
    ...mapActions(['setAppointmentAddress', 'setAppointmentDistance']),

    setPlace (place) {
      this.currentPlace = place
    },
    setLeavingAndArrivalTime () {
      var appointmentTime = this.timeGetter()
      appointmentTime = appointmentTime.split(':')
      // appointmentTime ==> [hour, minute]
      const totalMinute = parseInt(appointmentTime[0] * 60) + parseInt(appointmentTime[1])
      const totalDrivingMinutes = parseInt(this.duration / 60)

      const leavingTheOffice = totalMinute - totalDrivingMinutes
      const arrivalAtTheOffice = totalMinute + 60 + totalDrivingMinutes

      const leavingHour = leavingTheOffice / 60
      let leavingMinute = leavingTheOffice % 60

      const arrivalHour = arrivalAtTheOffice / 60
      let arrivalMinute = arrivalAtTheOffice % 60

      this.duration = `${parseInt(totalDrivingMinutes / 60)} hour ${parseInt(totalDrivingMinutes % 60)} minute`

      if (leavingMinute < 10) leavingMinute = '0' + leavingMinute
      if (arrivalMinute < 10) arrivalMinute = '0' + arrivalMinute

      this.leaving = leavingHour + ':' + leavingMinute
      this.arrival = arrivalHour + ':' + arrivalMinute
    },
    getPostcode () {
      let url = 'https://api.postcodes.io/postcodes?'
      url = `${this.proxy}${url}lon=${this.destination.lng}&lat=${this.destination.lat}`
      const vm = this
      const config = {
        url,
        method: 'GET'
      }

      this.axios(config)
        .then((response) => {
          vm.destinationPostcode = response.data.result[0].postcode
          vm.setAppointmentAddress(vm.destinationPostcode)
        })
        .catch((error) => {
          alert(error)
        })
    },

    getDuration () {
      const distanceURL =
        'https://maps.googleapis.com/maps/api/distancematrix/json?'
      const originPlaceId = 'ChIJgZRHYn7p2EcRuzS6cN4ZwuM'
      const url = `${this.proxy}${distanceURL}origins=place_id:${originPlaceId}&destinations=place_id:${this.currentPlace.place_id}&key=${process.env.VUE_APP_MAP_API_KEY}`
      const vm = this
      var config = {
        url,
        method: 'GET'
      }

      this.axios(config)
        .then((response) => {
          const elements = response.data.rows[0].elements[0]
          vm.duration = elements.duration.value
          vm.distance = elements.distance.text
          vm.setLeavingAndArrivalTime()
          vm.setAppointmentDistance({
            duration: vm.duration,
            distance: vm.distance
          })
        })
        .catch((error) => {
          alert(error)
        })
    },

    addMarker () {
      this.destination = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng()
      }
      this.getDuration()
      this.getPostcode()
    }
  }
}
</script>
