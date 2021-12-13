<template>
  <div class="my-4">
    <p>Select Date and Time:</p>
    <vc-date-picker v-model="date" mode="dateTime" is24hr>
      <template v-slot="{ inputValue, inputEvents }">
        <input
          class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
          :value="inputValue"
          v-on="inputEvents"
          required
        />
      </template>
    </vc-date-picker>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppCalendar',
  props: ['dateValue', 'timeValue'],
  data () {
    return {
      date: new Date()
    }
  },
  methods: {
    ...mapActions(['setAppointment'])
  },
  watch: {
    dateValue: {
      immediate: true,
      handler (updateDateValue) {
        const value = updateDateValue.split('/')
        this.date.setFullYear(
          parseInt(value[2]),
          parseInt(value[1]) - 1,
          parseInt(value[0])
        )
      }
    },
    timeValue: {
      immediate: true,
      handler (updateTimeValue) {
        const value = updateTimeValue.split(':')
        this.date.setHours(parseInt(value[0]))
        this.date.setMinutes(parseInt(value[1]))
      }
    },
    date: {
      immediate: true,
      deep: true,
      handler (newDate) {
        const date = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
        const time = `${newDate.getHours()}:${newDate.getMinutes()}`
        this.setAppointment({ date, time })
      }
    }
  }
}
</script>
