export function config(container) {
  return {
    container: container,
    connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        interacting :{
          boolean :false
        }
      },
    width: 800,
    height: 600,
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    panning: {
      enabled: true,
      // modifiers: 'shift',//配合按键 避免冲突
      eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
    },
    zoom:{
      enabled: true,
    },
    //辅助线 对齐线
    snapline: {
        enabled: true,
      },
    selecting: {
        enabled: true,
            className: 'my-selecting',
            // rubberband: true, // 启用框选
      },
  }
}
