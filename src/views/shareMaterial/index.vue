<template>
  <div class="box">
    <el-button type="primary" plain @click="download">下载</el-button>
    <el-button type="primary" plain @click="selection">框选{{active}}</el-button>
    <el-button type="primary" plain @click="toContent">居中</el-button>
    <div class="content">
      <div class="app-stencil" ref="stencilContainer">
      </div>
      <div class="app-content" ref="container">
      </div>
    </div>

  </div>
</template>

<script>
  // 从 node_modules 引入
  import {
    Graph, DataUri, Shape, Addon
  } from '@antv/x6'
  import { GridLayout, CircularLayout  } from '@antv/layout' // umd模式下， const { GridLayout } = window.layout

  import {
    config
  } from '@/assets/canvasConfig'
  import {
    data
  } from '@/assets/canvasData'

  const { Rect, Circle } = Shape

  export default {
    data() {
      return {
        dataJson: data,
        configJson: {},
        graph: null,
        dnd: null,
        active: false,
        stencilContainer: ""
      }
    },
    methods: {
      download() {
        this.graph.toPNG((dataUri) => {
          // 下载
          DataUri.downloadDataUri(dataUri, 'chart.png')
        })
      },
      selection() {
        let status = this.graph.isRubberbandEnabled();
        console.log(status);
        this.active = !status
        if (!status) {
          this.graph.disablePanning()
          this.graph.enableRubberband()
        } else {
          this.graph.enablePanning()
          this.graph.disableRubberband()
        }
      },
      toContent() {
        this.graph.centerContent()
      },
    },
    mounted() {
      // 创建 Graph 的实例
      let box = this.$refs['container'];
      this.configJson = config(box);
      const graph = new Graph(this.configJson)
      this.graph = graph;
      console.log(this.dataJson)
      console.log(this.configJson)
      // const gridLayout = new GridLayout({
      const gridLayout = new CircularLayout ({
        type: 'circular',
        width: 600,
        height: 400,
        center: [300, 200],
        radius: 50,
      })

      const newModel = gridLayout.layout(this.dataJson)
      // 渲染边
      this.graph.fromJSON(newModel)

      const rect = new Shape.Rect({
        id: 'node3',
        x: 100,
        y: 100,
        rotate: 300,
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: 'blue',
          },
          label: {
            text: 'Hello',
            fill: 'white',
          },
        },
        zIndex: 2,

      })

      const circle = new Shape.Circle({
        id: 'node4',
        x: 380,
        y: 500,
        width: 60,
        height: 60,
        label: 'circle',
        zIndex: 2,
        attrs: {
          // 指定 rect 元素的样式
          body: {
            stroke: 'red', // 边框颜色
            fill: '#fff', // 填充颜色
          },
          // 指定 text 元素的样式
          label: {
            text: 'rect', // 文字
            fill: '#333', // 文字颜色
          },
        },
      })

      const edge = new Shape.Edge({
        id: 'edge1',
        source: {
          cell: 'node3',
          port: 'out-port-1'
        }, // 源节点和链接桩 ID
        target: {
          cell: 'node4',
          port: 'in-port-1'
        }, // 目标节点 ID 和链接桩 ID
        vertices: [{
            x: 100,
            y: 200
          },
          {
            x: 300,
            y: 120
          },
        ],
        labels: ['测试'],
        zIndex: 1,
      })
      edge.attr({
        line: {
          sourceMarker: {
            tagName: 'path',
            d: 'M 20 -10 0 0 20 10 Z',
          },
          targetMarker: {
            tagName: 'path',
            fill: 'yellow', // 使用自定义填充色
            stroke: 'green', // 使用自定义边框色
            strokeWidth: 2,
            d: 'M 20 -10 0 0 20 10 Z',
          },
        },
      })
      graph.addNode(rect)
      graph.addNode(circle)
      graph.addEdge(edge)
      const child = graph.addNode({
        x: 120,
        y: 80,
        width: 40,
        height: 60,
        zIndex: 10,
        label: 'Child\n(embedded)',
        attrs: {
          body: {
            fill: 'green',
          },
          label: {
            fill: '#fff',
          },
        },
      })

      const parent = graph.addNode({
        x: 80,
        y: 40,
        width: 40,
        height: 60,
        zIndex: 1,
        label: 'Parent\n(try to move me)',
      })

      parent.addChild(child);
      graph.on('node:selected', (cell, node, options) => {
        //节点被选中
        // console.log(cell)
      })
      this.active = this.graph.isRubberbandEnabled();
      const {
        Stencil
      } = Addon
      const stencil = new Stencil({
        title: 'Components',
        target: graph,
        search(cell, keyword) {
          return cell.shape.indexOf(keyword) !== -1
        },
        placeholder: 'Search by shape name',
        notFoundText: 'Not Found',
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        animation: true,
        validateNode(droppingNode, options) {
          //验证是否可添加
          console.log(droppingNode);
          if(droppingNode.shape === 'html'){
            return new Promise((resolve) => {
                const { draggingNode, draggingGraph } = options
                const view = !draggingGraph.findView(draggingNode)
                const contentElem = view.findOne('foreignObject > body > div')
                Dom.addClass(contentElem, 'validating')
                setTimeout(() => {
                  Dom.removeClass(contentElem, 'validating')
                  resolve(true)
                }, 3000)
              })
          }else{
            return true
          }

        },
        groups: [{
            name: 'group1',
            title: 'Group(Collapsable)',
          },
          {
            name: 'group2',
            title: 'Group',
            collapsable: false,
          },
        ],
      })

      this.$refs.stencilContainer.appendChild(stencil.container)

      const r = new Rect({
        width: 70,
        height: 40,
        attrs: {
          id:12,
          rect: {
            fill: '#31D0C6',
            stroke: '#4B4A67',
            strokeWidth: 6
          },
          text: {
            text: 'rect',
            fill: 'white'
          },
        },
      })

      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: {
            fill: '#FE854F',
            strokeWidth: 6,
            stroke: '#4B4A67'
          },
          text: {
            text: 'ellipse',
            fill: 'white'
          },
        },
      })

      const c2 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: {
            fill: '#4B4A67',
            'stroke-width': 6,
            stroke: '#FE854F'
          },
          text: {
            text: 'ellipse',
            fill: 'white'
          },
        },
      })

      const r2 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: {
            fill: '#4B4A67',
            stroke: '#31D0C6',
            strokeWidth: 6
          },
          text: {
            text: 'rect',
            fill: 'white'
          },
        },
      })

      const r3 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: {
            fill: '#31D0C6',
            stroke: '#4B4A67',
            strokeWidth: 6
          },
          text: {
            text: 'rect',
            fill: 'white'
          },
        },
      })

      const c3 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: {
            fill: '#FE854F',
            strokeWidth: 6,
            stroke: '#4B4A67'
          },
          text: {
            text: 'ellipse',
            fill: 'white'
          },
        },
      })

      stencil.load([r, c, c2, r2.clone()], 'group1')
      stencil.load([c2.clone(), r2, r3, c3], 'group2')
      this.configJson.connecting.validateConnection = ({ edge, type, previous })=>{
        console.log(edge, type, previous);
        return false
      }
      graph.on('node:click', ({ e, x, y, node, view }) => {
        console.log('节点被点击');
        console.log(graph)
        let listEdges = graph.getEdges();
        console.log(listEdges)
        console.log(listEdges[0].source,listEdges[0].target)
        console.log(listEdges[1].source,listEdges[1].target)
        let list = graph.getNodes();
        console.log(list)
        console.log(list[0].position({ relative: true }))
        node.attr({
          // 表示一个删除按钮，点击时删除该节点
          image: {
            event: 'node:delete',
            xlinkHref: 'trash.png',
            width: 20,
            height: 20,
          },
        })
        console.log(e, x, y, node, view);
      })
      graph.on('node:delete', ({ view, e }) => {
        e.stopPropagation()
        view.cell.remove()
      })
      graph.on('node:embedded',({ e, x, y, node, view }) => {
        console.log(e, x, y, node, view);
      })
      graph.on('node:added',({node }) => {
        console.log(node);
      })

    }
  }
</script>

<style>
  .my-selecting {
    background-color: red;
  }

  .content {
    font-family: sans-serif;
    display: flex;
  }

  .app-stencil {
    width: 250px;
    border: 1px solid #f0f0f0;
    position: relative;
  }

  .app-content {
    flex: 1;
    height: 520px;
    margin-left: 8px;
    margin-right: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .x6-graph-scroller {
    border: 1px solid #f0f0f0;
    margin-left: -1px;
  }
</style>
