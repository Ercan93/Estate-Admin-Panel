<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <p class="col-6 display-4 mt-4">Create New Appointment</p>
    <div class="col-9">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Client Name Surname:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Bruce Wayne"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="bruce@wayne.com"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Employees:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.employee"
            :options="employees"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" label="Phone:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.phone"
            type="number"
            placeholder="7351857301"
            required
          ></b-form-input>
        </b-form-group>

        <AppCalendar />

        <GoogleMap />

        <b-button type="submit" class="mr-4 mb-4" variant="success"
          >Save</b-button
        >
        <b-button type="reset" class="mb-4" variant="outline-danger"
          >Clean Form</b-button
        >
      </b-form>
    </div>
  </div>
</template>
<script>
import GoogleMap from "@/components/maps/GoogleMap";
import AppCalendar from "@/components/AppCalendar";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        phone: null,
        employee: null,
      },
      employees: ["Jason D.", "Micheal F.", "Anna B.", "Tommy K."],
    };
  },
  components: {
    GoogleMap,
    AppCalendar,
  },
  computed: {
    ...mapGetters(['appointmentGetter'])
  },
  methods: {
    makeToast() {
      this.$bvToast.toast('New Appointment created successfully', {
        title:"Heee!",
        variant: 'success',
        toaster: 'b-toaster-top-full',
        solid: true
      })
    },
    onSubmit() {
      let appointmentData = this.appointmentGetter
      let vm = this
      this.base("Appointments").create(
        [
          {
            fields: {
              "Client": this.form.name,
              "Client Email": this.form.email,
              "Client Phone": this.form.phone,
              "Employee": this.form.employee,
              "Appointment Address": appointmentData.address,
              "Appointment Date": appointmentData.date,
              "Appointment Time": appointmentData.time,
              "Driving Time": appointmentData.duration,
              "Driving Distance": appointmentData.distance,
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          vm.makeToast('success')
          records.forEach(function (record) {
            console.log(record.getId());
          });
        }
      );
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.name = "";
      this.form.phone = "";
      this.form.user = null;
    },
  },
};
</script>
