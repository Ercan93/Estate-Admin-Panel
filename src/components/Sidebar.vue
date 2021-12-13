<template>
  <div>
    <b-button class="m-4 fixed-top btn-info" v-b-toggle.sidebar-1>Menu</b-button>
    <b-sidebar id="sidebar-1" title="Iceberg Estates" :no-header-close="false" :visible="false">
      <div class="px-3 py-2">
        <div>
            <b-nav vertical>
                <b-nav-item>
                    <router-link to="/CreateAppointment">
                        <b-button class="btn" variant="btn btn-dark"> + Create Appointment</b-button>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/">
                        <b-button class="btn btn-dark">Home</b-button>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                  <router-link to="/Appointments">
                    <b-button class="btn btn-dark">Appointments</b-button>
                  </router-link>
                </b-nav-item>
            </b-nav>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  name: 'sidebar'
}
</script>
<style>
#sidebar-1{
  border: none;
}
.b-sidebar-header {
  background-color: #1f9bcf !important;
  color: #fff !important;
}
.b-sidebar-body {
  background-color: #dce5e9 !important;
  color:#fff !important;
}
</style>
