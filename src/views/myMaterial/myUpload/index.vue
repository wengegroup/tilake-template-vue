<template>
  <div>
    <h1 style="padding: 20px;">jsPlumb</h1>
    <div id="container">
      <div class="left">
        <ul>
          <li v-for="(item,index) in leftList" :key="'left' + index" name="source">
            {{item.name}}
            <i :id="item.nodeId" class="el-icon-edit" @click="nodeClickline('source',item)"></i>
          </li>
        </ul>
      </div>

      <div class="right">
        <ul>
          <li v-for="(item,index) in rightList" :key="'right' + index" :id="item.nodeId" name="target"
            @click="nodeClickline('target',item)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "linkElementModal",
    data() {
      return {
        jsPlumb: null, // 缓存实例化的jsplumb对象
        leftList: [{
            name: 'xxx_left_1',
            nodeId: 'left_1'
          },
          {
            name: 'xxx_left_2',
            nodeId: 'left_2'
          },
          {
            name: 'xxx_left_3',
            nodeId: 'left_3'
          },
          {
            name: 'xxx_left_4',
            nodeId: 'left_4'
          }
        ],
        rightList: [{
            name: 'xxx_right_1',
            nodeId: 'right_1'
          },
          {
            name: 'xxx_right_2',
            nodeId: 'right_2'
          },
          {
            name: 'xxx_right_3',
            nodeId: 'right_3'
          },
          {
            name: 'xxx_right_4',
            nodeId: 'right_4'
          }
        ],
        linsParams: {
          source: '',
          target: ''
        }
      }
    },
    watch: {
      linsParams:{//深度监听，可监听到对象、数组的变化
         handler(val){
             if(val.source && val.target){
                this.automaticLine()
             }
         },
         deep:true //true 深度监听
     }
    },
    mounted() {
      this.showPlumb();
    },
    methods: {
      showPlumb() {
        this.jsPlumb = this.$jsPlumb.getInstance({
          Container: 'container', // 选择器id
          EndpointStyle: {
            radius: 0.11,
            fill: '#999'
          }, // 端点样式
          PaintStyle: {
            stroke: '#999',
            strokeWidth: 2
          }, // 绘画样式，默认8px线宽  #456
          HoverPaintStyle: {
            stroke: '#994B0A',
            strokeWidth: 3
          }, // 默认悬停样式  默认为null
          ConnectionOverlays: [ //连线的叠加组件，如箭头、标签
            ["Arrow", { //箭头参数设置
              location: 1,
              visible: true,
              width: 11,
              length: 11,
              id: "ARROW",
              events: {
                click: function() {
                  alert(1)
                }
              }
            }],
            ["Label", { //标签参数设置
              location: 0.1,
              id: "label",
              cssClass: "aLabel", //hover时label的样式名
              events: {
                tap: function() {}
              },
              visible: true
            }]
          ],
          // ConnectionOverlays: [ // 此处可以设置所有箭头的样式
          //   ['Arrow', { // 设置参数可以参考中文文档
          //     location: 1,
          //     length: 12,
          //     paintStyle: {
          //       stroke: '#999',
          //       fill: '#999'
          //     }
          //   }]
          // ],
          Connector: ['Straight'], // 要使用的默认连接器的类型：直线，折线，曲线等
          DrapOptions: {
            cursor: 'crosshair',
            zIndex: 2000
          }
        });

        this.jsPlumb.batch(() => {
          for (let i = 0; i < this.leftList.length; i++) {
            this.initLeaf(this.leftList[i].nodeId, 'source');
          }
          for (let j = 0; j < this.rightList.length; j++) {
            this.initLeaf(this.rightList[j].nodeId, 'target')
          }
        })

        this.setjsPlumb(true, true);

        //点击连线
        this.jsPlumb.bind('click', (conn, originalEvent) => {
          console.log(conn, originalEvent)
        })

        //连线时触发
        this.jsPlumb.bind('connection', (conn, originalEvent) => {
          console.log(conn.sourceId)
          console.log(conn.targetId)
        })

        //右键触发
        this.jsPlumb.bind('contextmenu', (conn, originalEvent) => {
          console.log(conn, originalEvent)
        })
      },
      //  初始化规则使其可以连线、拖拽
      initLeaf(id, type) {
        const ins = this.jsPlumb;
        const elem = document.getElementById(id);
        if (type === 'source') {
          ins.makeSource(elem, {
            anchor: [1, 0.5, 0, 0], // 左 上 右 下
            allowLoopback: false, //允许回连
            maxConnections: -1 //最大连接数（-1表示不限制）
          })
        } else {
          ins.makeTarget(elem, {
            anchor: [0, 0.5, 0, 0],
            allowLoopback: false,
            maxConnections: -1
          })
        }
      },
      setjsPlumb(sourceFlag, targetFlag) {
        const source = document.getElementsByName('source')
        const target = document.getElementsByName('target')

        this.jsPlumb.setSourceEnabled(source, sourceFlag)
        this.jsPlumb.setTargetEnabled(target, targetFlag)
        this.jsPlumb.setDraggable(source, false) // 是否支持拖拽
        this.jsPlumb.setDraggable(target, false) // 是否支持拖拽

        this.jsPlumb.connect({
          source: 'left_1',
          target: 'right_1',
          connector: ['Bezier'],
          paintStyle: {
            stroke: 'lightgray',
            strokeWidth: 3
          },
        })
      },
      automaticLine(){
        let params = Object.assign({},this.linsParams);
        this.jsPlumb.connect(params)
        params = {
          source: '',
          target: '',
        };
        this.linsParams = params
      },
      nodeClickline(type, item) {
        console.log(type)
        this.linsParams[type] = item.nodeId
      }
    }
  }
</script>

<style>
  #container {
    width: 500px;
    height: 500px;
    padding: 20px;
    position: relative;
    /*一定加上这句，否则连线位置发生错乱*/
  }

  .left {
    float: left;
    width: 150px;
  }

  .right {
    float: right;
    width: 150px;
  }

  .left li,
  .right li {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #efefef;
    margin-bottom: 20px;
    padding: 8px 5px;
  }
</style>
