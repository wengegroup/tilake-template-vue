<template>
  <div class="menu_topbar">
    <el-menu
      ref="elMenu"
      class="menu_topbar"
      :default-active="activeMenu"
      mode="horizontal"
    >
      <sidebar-item
        v-for="(route,index) in permission_routes"
        :key="index"
        :class="{'special-theme': theme =='blue'}"
        :item="route"
        :base-path="route.path"
        :active-menu="activeMenu"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routes', 'theme']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) return meta.activeMenu
      return path
    }
  }
}
</script>
