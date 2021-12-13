<template>
  <div class="container-fluid d-flex flex-column align-items-center mt-5">
    <h1 class="col-10 col-md-5 mt-4">{{ title }}</h1>
    <div class="col-9">
      <!-- Appointment Form -->
      <appointment-form
        :onSubmit="onSubmit"
        :onReset="onReset"
        :formDefaults="form"
        :employees="employees"
      >
        <!-- Save Button -->
        <template v-slot:submitButton>
          <b-button type="submit" class="mr-4 mb-4" variant="success"
            >Save</b-button
          >
        </template>
        <!-- End of Save Button -->
        <!-- Clear Form Button -->
        <template v-slot:resetButton>
          <b-button type="reset" class="mb-4" variant="outline-danger"
            >Clean Form</b-button
          >
        </template>
        <!-- End of Clear Form Button -->
      </appointment-form>
      <!-- End of Appointment Form -->
    </div>
  </div>
</template>
<script>
import AppointmentForm from '@/components/AppointmentForm'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      title: 'Create Appointment',
      form: {
        id: '',
        name: '',
        email: '',
        phone: null,
        employee: '',
        address: '',
        date: '',
        time: '',
        duration: '',
        distance: '',
        leaving: '',
        arrival: ''
      },
      employees: ['Jason D.', 'Micheal F.', 'Anna B.', 'Tommy K.']
    }
  },
  components: {
    AppointmentForm
  },
  computed: {
    ...mapGetters(['appointmentGetter'])
  },
  watch: {
    '$route.name': {
      deep: true,
      immediate: true,
      handler: function (name) {
        this.setTitle(name)
      }
    }
  },
  methods: {
    ...mapActions(['setAppointment']),

    /**
     * @description It runs when the router changes
     * and sets the form data according to the router name.
     * @param {String} name
     */
    setTitle (name) {
      if (name === 'UpdateAppointment') {
        this.title = 'Update Appointment'
        Object.assign(this.form, this.appointmentGetter)
      } else {
        this.title = 'Create Appointment'
        this.onReset()
      }
    },

    /**
     * @description bootstrap toast function
     * @param {String} title
     * @param {String} description
     * @param {String} variant
     */
    makeToast (title, description, variant) {
      this.$bvToast.toast(description, {
        title: title,
        variant: variant,
        toaster: 'b-toaster-top-full',
        solid: true
      })
    },

    /**
     * @description It makes the data given as
     * a parameter ready for sending to the API.
     * @param {Object} form
     * @return {Object}
     */
    setApiPayload (form) {
      var payload = {
        fields: { ...form }
      }
      return payload
    },

    /**
     * @description It creates a new appointment data
     * by sending the data given as a parameter to the API.
     * @param {Object} apiPayload
     */
    createAppointment (apiPayload) {
      var vm = this
      this.base('Appointments').create([apiPayload], function (err, records) {
        if (err) {
          console.error(err)
          vm.makeToast(
            'Opss!',
            'Something went wrong. Please try again.',
            'danger'
          )
          return
        }
        vm.makeToast(
          'Heey!',
          'New Appointment created successfully',
          'success'
        )
        setTimeout(() => {
          vm.$router.push('/Appointments')
        }, 2000)
      })
    },

    /**
     * @description It updates the current appointment
     * by sending the data given as a parameter to the API.
     * @param {Object} appointment
     */
    updateAppointment (apiPayload) {
      var vm = this
      this.base('Appointments').update([apiPayload], function (err, records) {
        if (err) {
          console.error(err)
          vm.makeToast(
            'Opss!',
            'Something went wrong. Please try again.',
            'danger'
          )
          return
        }
        vm.makeToast(
          'Heey!',
          'Appointment updated successfully',
          'success'
        )
        setTimeout(() => {
          vm.$router.push('/Appointments')
        }, 2000)
      })
    },

    /**
     * @description it runs when the form is approved and calls the update
     * or create appointment function based on the title variable.
     */
    onSubmit () {
      var apiPayload = this.setApiPayload(this.appointmentGetter)
      delete apiPayload.fields.id
      if (this.title === 'Update Appointment') {
        apiPayload.id = this.appointmentGetter.id
        this.updateAppointment(apiPayload)
      } else {
        this.createAppointment(apiPayload)
      }
    },

    /**
     * @description Resets the entire form value.
     */
    onReset () {
      this.form = {
        id: '',
        name: '',
        email: '',
        phone: null,
        employee: '',
        address: '',
        date: '',
        time: '',
        duration: '',
        distance: '',
        leaving: '',
        arrival: ''
      }
    }
  },
  /**
   * @description It calls the onReset
   * function and resets the data in the Store.
   * @param {String} to
   * @param {String} from
   * @param {Function} next
   */
  beforeRouteLeave (to, from, next) {
    this.onReset()
    this.setAppointment(this.form)
    next()
  }
}
</script>
