<template>
  <div class="navbar" :class="layoutMode == 'portrait'?'layout-portrait':null">
    <!-- logo -->
    <div class="navbar-left-container">
      <div v-if="layoutMode == 'transverse'" class="logo-box">
        <img :src="logo" alt="logo">
        <span>{{ defaultSettings.title }}</span>
      </div>
      <topBar v-if="layoutMode == 'transverse'" />
    </div>
    <userInfo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import topBar from './Topbar'
import userInfo from './userInfo'

export default {
  components: { topBar, userInfo },
  data() {
    return {
      logo: require('@/assets/logo/tianhu.svg'),
      defaultSettings: require('@/settings.js')
    }
  },
  computed: {
    ...mapGetters(['userData', 'layoutMode', 'sidebar'])
  }
}
</script>
