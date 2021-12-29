// 公用处理
export default {
  methods: {
    // 重置表单
    resetForm(name) {
      this.$refs[name].resetFields()
    }
  }
}
