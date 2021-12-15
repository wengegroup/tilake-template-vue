<!-- 首页 -->
<template>
  <div class="index">
    <h1>svg连线</h1>
    <div class="img-box">
      <div @click="drawlines('img', '50,0,1')"></div>
      <div @click="drawlines('img', '250,0,2')"></div>
      <div @click="drawlines('img', '450,0,3')"></div>
    </div>
    <svg>
      <line
        v-for="(val, key) in svgArr"
        :key="key"
        :x1="val.x"
        :y1="val.y"
        :x2="val.x1"
        :y2="val.y1"
        :style="{
          stroke: val.isTrue ? 'green' : 'rgb(255, 0, 0)',
          'stroke-width': 5,
          'stroke-dasharray': val.isTrue ? 0 : 8,
        }"
        :class="{ 'err-line': val.isTrue ? false : true }"
      />
    </svg>
    <div class="english">
      <div @click="drawlines('eng', '50,100,3')">red</div>
      <div @click="drawlines('eng', '250,100,2')">blue</div>
      <div @click="drawlines('eng', '450,100,1')">skyblue</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textObj: {
        title: '',
      },
      isClick: false,
      svgArr: [],
      svgObj: {},
      isDrawlines: true,
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 图案连线点击事件
     * 如果对象只有 img || english 属性时 说明当前只有一个点 不进行push数组（联线）
     */
    drawlines(type, xy) {
      /**
       * 如果有错误 禁止再次画线
       */
      if (!this.isDrawlines) {
        return
      }
      if (!this.svgObj.type) {
        this.svgObj[type] = {
          x: xy.split(',')[0],
          y: xy.split(',')[1],
          z: xy.split(',')[2],
        }
      }
      /**
       * 只有对象长度时2的时候push
       */
      if (Object.keys(this.svgObj).length == 2) {
        let obj = {
          x: this.svgObj.img.x,
          y: this.svgObj.img.y,
          x1: this.svgObj.eng.x,
          y1: this.svgObj.eng.y,
          isTrue: this.svgObj.img.z == this.svgObj.eng.z ? true : false,
        }
        /**
         * 去重操作
         */
        if (this.unique(obj)) {
          this.svgArr.push(obj)
          /**
           * 如果有错误 1s 后自动删除
           */
          if (!obj.isTrue) {
            this.isDrawlines = false
            setTimeout(() => {
              this.svgArr.splice(this.svgArr.length - 1, 1)
              this.isDrawlines = true
            }, 3000)
          }
          this.svgObj = {}
        }
      }
    },
    unique(obj) {
      var str = JSON.stringify(obj)
      var num = 0
      this.svgArr.forEach((val) => {
        if (JSON.stringify(val) === str) {
          num = 1
        }
      })
      return num == 0 ? true : false
    },
  },
  created() {},
  mounted() {},
}
</script>
<style scoped>
.img-box,
.english {
  margin: 0 auto;
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: space-between;
}
.img-box div,
.english div {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
}
.img-box div:nth-child(1) {
  background-color: red;
}
.img-box div:nth-child(2) {
  background-color: blue;
}
.img-box div:nth-child(3) {
  background-color: skyblue;
}
.english div:nth-child(1) {
  background-color: red;
}
.english div:nth-child(2) {
  background-color: blue;
}
.english div:nth-child(3) {
  background-color: skyblue;
}
svg {
  width: 500px;
  height: 100px;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  35% {
    opacity: 0.35;
  }
  55% {
    opacity: 0.55;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes blink {
  0% {
    opacity: 0;
  }
  35% {
    opacity: 0.35;
  }
  55% {
    opacity: 0.55;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
  }
}
svg .err-line {
  animation: blink 0.5s infinite ease-in;
  -webkit-animation: blink 0.5s infinite ease-in; /*Safari and Chrome*/
}
</style>
