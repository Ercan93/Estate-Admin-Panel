<template>
  <div>
    <b-button class="m-4" v-b-toggle.sidebar-1>Menü</b-button>
    <b-sidebar id="sidebar-1" title="Iceberg Estates" :no-header-close="false" :visible="true">
      <div class="px-3 py-2">
        <div>
            <b-nav vertical>
                <b-nav-item>
                    <router-link to="/CreateAppointment">
                        <b-button class="btn" variant="primary"> + Ranevu Oluştur</b-button>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/">
                        <b-button class="btn">Ana Sayfa</b-button>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                  <router-link to="/Appointments">
                    <b-button class="btn">Randevular</b-button>
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