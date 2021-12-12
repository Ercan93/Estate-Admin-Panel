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
      title: 'Create New Appointment',
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
        distance: ''
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
    setTitle (name) {
      if (name === 'UpdateAppointment') {
        this.title = 'Update Appointment'
        Object.assign(this.form, this.appointmentGetter)
      } else {
        this.title = 'Create Appointment'
        this.onReset()
      }
    },
    makeToast (title, description, variant) {
      this.$bvToast.toast(description, {
        title: title,
        variant: variant,
        toaster: 'b-toaster-top-full',
        solid: true
      })
    },
    setApiPayload (form) {
      delete form.id
      const payload = {
        fields: { ...form }
      }
      return payload
    },
    createAppointment (apiPayload, vm) {
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
      })
    },
    updateAppointment (apiPayload, vm) {
      this.base('Appointment').update([apiPayload], function (err, records) {
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
      })
    },
    onSubmit () {
      const apiPayload = this.setApiPayload(this.appointmentGetter)
      const vm = this
      if (toString(this.$route.name) === 'UpdateAppointment') {
        apiPayload.id = this.appointmentGetter.id
        vm.updateAppointment(apiPayload, vm)
      } else {
        vm.createAppointment(apiPayload, vm)
      }
    },
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
        distance: ''
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.onReset()
    this.setAppointment(this.form)
    next()
  }
}
</script>
