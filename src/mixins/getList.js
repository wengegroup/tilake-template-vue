export default {
  data() {
    return {
      autoLoad: true,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      correctParams: {},
      syncParamsToUrl: false,
      dataList: [], // 统一返回的数据对象
      api: null, // api接口的方法
      alias: {
        // 参数别名，保持数据应用的统一性
        dataList: 'dataList',
        total: 'total',
        pageNum: 'current',
        pageSize: 'size'
      },
      total: 1000,
      loading: false,
      paramsException: [] // 过滤后端不需要的参数
    }
  },
  methods: {
    changeToCurrentParams(cb) {
      for (const key in this.params) {
        if (this.paramsException.includes(key)) {
        } else if (this.alias[key]) {
          this.correctParams[this.alias[key]] = this.params[key]
        } else {
          this.correctParams[key] = this.params[key]
        }
      }
      if (this.syncParamsToUrl) {
        this.$router.push({
          path: this.$route.path,
          query: this.params
        })
      }
      cb && cb()
    },
    search() {
      this.params.pageNum = 1
      this.getList()
    },
    gotoPage(pageNum, pageSize) {
      this.params.pageNum = parseInt(pageNum) || this.params.pageNum
      this.params.pageSize = parseInt(pageSize) || this.params.pageSize
      this.getList()
    },
    getList() {
      if (this.beforeAction) {
        this.beforeAction()
      }
      this.changeToCurrentParams(() => {
        if (!this.api) {
          return
        }
        if (this.$route.meta.loading == 1) {
          this.loading = false
        } else {
          this.loading = true
        }
        const params = this.correctParams
        // params[this.apiParmas] = this.correctParams
        console.log(params)
        // const params = this.correctParams
        this.api(params)
          .then(res => {
            // if (res.code == '000401') {
            //   this.$message.warning(res.mesg)
            //   console.log('----123434534657686786856')
            //   const href =
            //   'http://192.168.10.165:10086/v1/cas/logout?callbackUrl=http://192.168.10.179:31819/tbase-opreation-service-test/api/v1/login/callback'
            //   window.location.href = href
            //   this.loading = false
            //   return
            // }
            this.loading = false
            // this.params.total = res.data && (res[this.alias['total']] || res.data[this.alias['total']])
            if (this.dataCallBack) {
              this.dataCallBack(res)
            } else if (res.code === 200 || res.status === 1200) {
              this.dataList = res[this.alias['dataList']]
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1;
      const query = this.$route.query
      const params = this.$route.params
      const allParams = Object.assign({}, query, params)
      // 如果路由带有参数，则实例化会 params 对象中
      for (const key in allParams) {
        this.params[key] = /^\d+$/.test(allParams[key])
          ? parseInt(allParams[key])
          : allParams[key]
      }
      if (this.autoLoad) {
        this.getList()
      }
    })
  }
}
