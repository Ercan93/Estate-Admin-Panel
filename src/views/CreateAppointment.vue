<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <p class="col-6 display-4 mt-4">Create New Appointment</p>
    <div class="col-9">
      <appointment-form :onSubmit="onSubmit" :onReset="onReset" :formDefaults="form">
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: null,
        employee: '',
        employees: ["Jason D.", "Micheal F.", "Anna B.", "Tommy K."],
        addressCode:'',
        dateTime:{
          date:'',
          time:'',
        }
      },
    };
  },
  components: {
    AppointmentForm,
  },
  computed: {
    ...mapGetters(["appointmentGetter"]),
  },
  methods: {
    makeToast(title, description, variant) {
      this.$bvToast.toast(description, {
        title: title,
        variant: variant,
        toaster: "b-toaster-top-full",
        solid: true,
      });
    },
    onSubmit() {
      let appointmentData = this.appointmentGetter;
      let vm = this;
      this.base("Appointments").create(
        [
          {
            fields: {
              "Client": appointmentData.name,
              "Client Email": appointmentData.email,
              "Client Phone": appointmentData.phone,
              "Employee": appointmentData.employee,
              "Appointment Address": appointmentData.address,
              "Appointment Date": appointmentData.date,
              "Appointment Time": appointmentData.time,
              "Driving Time": appointmentData.duration,
              "Driving Distance": appointmentData.distance,
            },
          },
        ],
        function (err) {
          if (err) {
            console.error(err);
            vm.makeToast(
              "Opss!",
              "Something went wrong. Please try again.",
              "danger"
            );
            return;
          }
          vm.makeToast(
            "Heey!",
            "New Appointment created successfully",
            "success"
          );
        }
      );
    },
    onReset() {
      this.form.email = "";
      this.form.name = "";
      this.form.phone = "";
      this.form.user = null;
      this.form.dateTime = {
        date : '',
        time : ''
      }
    },
  },
};
</script>
