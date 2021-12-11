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

    <AppCalendar
      :dateValue="formDefaults.date"
      :timeValue="formDefaults.time"
    />

    <GoogleMap
      :addressValue="formDefaults.address"
      :durationValue="formDefaults.duration"
      :distanceValue="formDefaults.distance"
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
    ...mapActions(['setAppointmentUser'])
  },
  watch: {
    formDefaults: {
      deep: true,
      handler (newValue) {
        this.setAppointmentUser(newValue)
      }
    }
  }
}
</script>
