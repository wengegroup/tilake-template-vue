<!--
 * @Description: 暂无数据
 * @Date: 2021-03-02 10:31:54
-->
<template>
  <div class="empty" :style="{'padding-Top': paddingTop + 'px'}">
    <div v-if="showPic" class="empty_img" :style="{width: width +'px'}">
      <img :src="url" alt="">
    </div>
    <p class="empty_description">{{ noDataAvailable }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    showPic: {
      type: Boolean,
      required: true
    },
    /**
     * @description: 缺省图
     * debugger ：页面调试中，请返回
     * deleted ： 内容已删除
     * empty-image-default ：暂无数据-默认
     * img-load-fail： 图片下载失败
     * internet-error： 网络错误
     * nodata：没有内容
     * no-info-data：暂无消息内容
     * no-monitoring -data： 暂无监控内容
     * no-search-data： 暂无搜索内容
     * no-statistics-data：暂无统计内容
     * no-uploader-data： 暂无上传内容
     * system-maintenance： 系统维护中
     * warning： 警告
     */
    name: {
      type: String,
      default: 'empty-image-default'
    },
    noDataAvailable: {
      type: String,
      default: '暂无数据'
    },
    width: {
      type: Number,
      default: 350
    },
    paddingTop: {
      type: Number,
      default: 32
    }
  },
  computed: {
    url() {
      return require(`@/assets/nodata/${this.name}.svg`)
    }
  }
}
</script>

<style lang='scss' scoped>
.empty {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 32px 0;
  .empty_img {
    img {
      width: 100%;
    }
  }
  .empty_description {
    margin-top: 16px;
    padding: 0 60px;
    color: #969799;
    font-size: 14px;
    line-height: 20px;
  }
  .el-button {
    margin-top: 20px;
  }
}
</style>
