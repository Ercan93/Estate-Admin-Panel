<template>
  <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <b-form-group
      id="input-group-1"
      label="Client Name Surname:"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="formDefaults.name"
        placeholder="Bruce Wayne"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Email:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="formDefaults.email"
        type="email"
        placeholder="bruce@wayne.com"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Employees:" label-for="input-3">
      <b-form-select
        id="input-3"
        v-model="formDefaults.employee"
        :options="employees"
        required
      ></b-form-select>
    </b-form-group>

    <b-form-group id="input-group-4" label="Phone:" label-for="input-4">
      <b-form-input
        id="input-4"
        v-model="formDefaults.phone"
        type="number"
        placeholder="7351857301"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-5" label="Postcode:" label-for="input-5">
      <b-form-input
        id="input-5"
        v-model="formDefaults.address"
        placeholder="cm27pj"
        required
      ></b-form-input>
    </b-form-group>

    <AppCalendar
      :dateValue="formDefaults.date"
      :timeValue="formDefaults.time"
    />

    <GoogleMap
      :defaultValues="{
        duration: formDefaults.duration,
        distance: formDefaults.distance,
        leaving: formDefaults.leaving,
        arrival: formDefaults.arrival,
      }"
    />

    <slot name="submitButton"></slot>
    <slot name="resetButton"></slot>
  </b-form>
</template>

<script>
import GoogleMap from '@/components/maps/GoogleMap'
import AppCalendar from '@/components/AppCalendar'
import { mapActions } from 'vuex'
export default {
  name: 'AppointmentForm',
  props: ['formDefaults', 'employees', 'onSubmit', 'onReset'],
  data () {
    return {}
  },
  components: {
    GoogleMap,
    AppCalendar
  },
  methods: {
    ...mapActions(['setAppointment'])
  },
  watch: {
    formDefaults: {
      deep: true,
      handler (newValue) {
        const clientData = {
          name: newValue.name,
          email: newValue.email,
          employee: newValue.employee,
          phone: newValue.phone,
          address: newValue.address
        }
        this.setAppointment(clientData)
      }
    }
  }
}
</script>
