export const data = {
  nodes: [{
      id: 'node1',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          strokeDasharray: '10,2',
        },
        label: {
          text: 'Hello',
          fill: '#333',
          fontSize: 13,
        },
      },
      // ports: {
      //     groups: {
      //       group1: {
      //         attrs: {
      //           circle: {
      //             r: 6,
      //             magnet: true,
      //             stroke: '#31d0c6',
      //             strokeWidth: 2,
      //             fill: '#fff',
      //           },
      //         },
      //       },
      //     },
      //     items: [
      //       {
      //         id: 'port1',
      //         group: 'group1', // 指定分组名称
      //       },
      //       {
      //         id: 'port2',
      //         group: 'group1', // 指定分组名称
      //       },
      //       {
      //         id: 'port3',
      //         group: 'group1', // 指定分组名称
      //       },
      //     ],
      //   },
    },
    {
      id: 'node2',
      x: 180,
      y: 240,
      width: 200,
      height: 80,
      label: 'In Ports & Out Ports',
        ports: {
          groups: {
            // 输入链接桩群组定义
            in: {
              position: 'top',
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
                text: { text: 'in1' },
              },
            },
            // 输出链接桩群组定义
            out: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            {
              id: 'port1',
              group: 'in',
            },
            {
              id: 'port2',
              group: 'in',
            },
            {
              id: 'port3',
              group: 'in',
            },
            {
              id: 'port4',
              group: 'out',
              attrs: {
                text: { text: 'out1' },
              },
            },
            {
              id: 'port5',
              group: 'out',
              attrs: {
                text: { text: 'out2' },
              },
            },
          ],
        },
    },
    {
      id: 'node255',
      x: 380,
      y: 40,
      width: 100,
      height: 80,
      label: 'In Ports & Out Ports',
        ports: {
          groups: {
            // 输入链接桩群组定义
            in: {
              position: 'top',
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
                text: { text: 'in1' },
              },
            },
            // 输出链接桩群组定义
            out: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            {
              id: 'port144',
              group: 'in',
            },
            {
              id: 'port455',
              group: 'out',
              attrs: {
                text: { text: 'out1' },
              },
            },
          ],
        },
    },
  ],
  edges: [{
    source: 'node1',
    target: 'node2',
    shape: 'double-edge',
    labels: ['测试'],
    // defaultLabel,
    attrs: {
      line: {
        stroke: 'orange',
      },
    },
  }, ],
}
