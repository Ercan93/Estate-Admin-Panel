<template>
  <div id="app">
    <Sidebar />
    <router-view/>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #e0f3fc;
}
::-webkit-scrollbar-thumb {
  background: #898c8f;
}
::-webkit-scrollbar-thumb:hover {
  background: #55595c;
}
</style>
