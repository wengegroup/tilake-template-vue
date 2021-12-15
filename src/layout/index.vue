<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="layoutMode == 'portrait'" id="siderBarBox">
      <sidebar class="sidebar-container" />
    </div>
    <div class="app-container" :class="layoutMode == 'transverse'?'hide-siderbar':''">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <div class="main-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(['layoutMode']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/common/mixin.scss";
  .app-wrapper {
    @include clearfix;
    @include relative;
  }
</style>
