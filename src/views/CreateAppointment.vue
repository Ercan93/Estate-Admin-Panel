<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <p class="col-6 display-4 mt-4">{{ title }}</p>
    <div class="col-9">
      <appointment-form
        :onSubmit="onSubmit"
        :onReset="onReset"
        :formDefaults="form"
      >
        <template v-slot:submitButton>
          <b-button type="submit" class="mr-4 mb-4" variant="success"
            >Save</b-button
          >
        </template>
        <template v-slot:resetButton>
          <b-button type="reset" class="mb-4" variant="outline-danger"
            >Clean Form</b-button
          >
        </template>
      </appointment-form>
    </div>
  </div>
</template>
<script>
import AppointmentForm from '@/components/AppointmentForm'
import { mapGetters } from 'vuex'
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
        employees: ['Jason D.', 'Micheal F.', 'Anna B.', 'Tommy K.'],
        address: '',
        date: '',
        time: '',
        duration: '',
        distance: ''
      }
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
      handler: function (name) {
        this.setTitle(name)
      }
    }
  },
  methods: {
    setTitle (name) {
      if (toString(name) === 'UpdateAppointment') {
        this.title = 'Update Appointment'
        Object.assign(this.form, this.appointmentGetter)
      } else {
        this.title = 'Create New Appointment'
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
      const payload = {
        fields: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          employee: form.employee,
          address: form.address,
          date: form.date,
          time: form.time,
          duration: form.duration,
          distance: form.distance
        }
      }
      return payload
    },
    onSubmit () {
      const apiPayload = this.setApiPayload(this.appointmentGetter)
      const vm = this
      if (toString(this.$route.name) === 'UpdateAppointment') {
        apiPayload.id = this.appointmentGetter.id
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
      } else {
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
      }
    },
    onReset () {
      this.name = ''
      this.email = ''
      this.phone = null
      this.employee = ''
      this.address = ''
      this.date = ''
      this.time = ''
      this.duration = ''
      this.distance = ''
    }
  }
}
</script>
