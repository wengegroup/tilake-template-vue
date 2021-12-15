<template>
  <el-drawer
    title="主题设置"
    :modal="false"
    size="308px"
    :show-close="false"
    :visible.sync="drawer"
    :direction="direction"
  >
    <div class="setting-container">
      <div class="layout-mode">
        <el-divider>布局</el-divider>
        <el-row>
          <el-col :span="12" :class="layoutMode == 'transverse'?'activeClass':''" @click.native="handleLayout('transverse')">
            <img src="~@/assets/theme/transverse.png" alt="">
            <div>横向布局(默认)</div>
          </el-col>
          <el-col :span="12" :class="layoutMode == 'portrait'?'activeClass':''" @click.native="handleLayout('portrait')">
            <img src="~@/assets/theme/portrait.png" alt="">
            <div>纵向布局</div>
          </el-col>
        </el-row>
      </div>
      <div class="theme-mode">
        <el-divider>主题</el-divider>
        <el-row>
          <el-col
            v-for="(item,index) in themeList"
            :key="index"
            :span="12"
            :class="theme == item.theme?'activeClass':''"
            @click.native="handleTheme(item)"
          >
            <img :src="item.url" :alt="item.theme">
            <div>{{ item.label }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
const defaultSettings = require('@/settings')
export default {
  name: 'SettingDrawer',
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      themeList: [ // 内置主题
        {
          color: '#169688',
          theme: 'cyan',
          label: '远黛青山(默认)',
          url: require('@/assets/theme/cyan.png')
        },
        {
          color: '#ed6363',
          theme: 'red',
          label: '朝阳如炬',
          url: require('@/assets/theme/red.png')
        },
        {
          color: '#207DFC',
          theme: 'blue',
          label: '智慧之心',
          url: require('@/assets/theme/blue.png')
        },
        {
          color: '#3252a5',
          theme: 'white',
          label: '素星白露',
          url: require('@/assets/theme/white.png')
        },
        {
          color: '#F7AB00',
          theme: 'black',
          label: '墨色轩辕',
          url: require('@/assets/theme/black.png')
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['theme', 'layoutMode'])
  },
  methods: {
    // 切换布局
    handleLayout(layoutMode) {
      this.$store.dispatch('app/toggleLayoutMode', layoutMode)
    },
    // 切换主题色
    handleTheme(item) {
      this.$store.dispatch('app/toggleTheme', item.theme)
      this.$store.dispatch('app/toggleThemeColor', item.color)
      this.$common.toggleClass(document.body, `${defaultSettings.prefix}-` + item.theme)
    }
  }
}
</script>

<style lang='scss' scoped>
.setting-container {
  padding: 0px 33px;
  @include color('main-text');
  .el-divider--horizontal{
    margin: 36px 0 24px 0;
    .el-divider__text{
      padding: 0 2px;
    }
  }
  .theme-mode {
    margin-top: 48px;
  }
  .el-row {
    .el-col {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      padding: 8px;
      border: 1px solid #E85A50;
      border-color: transparent;
      img {
        width: 96px;
        height: 50px;
      }
      div {
        margin-top: 12px;
      }
    }
  }
  .activeClass {
    border-color: var(--themeColor)!important;
    background-color: var(--themeTransparent);
  }
}
</style>
