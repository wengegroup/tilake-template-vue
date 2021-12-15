<!--
 * @Description:用户信息
 * @Date: 2021-02-20 17:05:46
-->
<template>
  <div class="user-container">
    <div class="user-info">
      <el-tooltip effect="dark" content="更换皮肤" placement="bottom">
        <i
          class="iconfont"
          :class="hover ?'iconzu1679' :'iconhuanfu1'"
          @mouseover="hover =true"
          @mouseleave="hover =false"
          @click="openDrawer"
        />
      </el-tooltip>
      <el-tooltip effect="dark" content="消息通知" placement="bottom">
        <el-badge is-dot>
          <i class="iconfont icontongzhi" style="margin-right: 0" />
        </el-badge>
      </el-tooltip>
      <span class="user-box">
        <span class="avater">
          <i class="iconfont iconzu2267" />
        </span>
        <span class="user-name">
          {{ userData.userName }}
        </span>
      </span>
    </div>
    <!-- 设置弹窗 -->
    <setting-drawer ref="settingDrawer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import settingDrawer from '@/components/settingDrawer'
export default {
  components: { settingDrawer },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    openDrawer() {
      this.$refs.settingDrawer.drawer = true
    }
  }
}
</script>
