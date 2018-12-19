<template>
  <div ref="show" style="width: 100%;height:260px;"></div>
</template>

<script>
const nodes = [
  {
    time: '12a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '12a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 0, 5]
      },
      {
        time: '12a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 0, 6]
      }
    ]
  },
  {
    time: '1a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '1a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 1, 10]
      },
      {
        time: '1a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 1, 1]
      }
    ]
  },
  {
    time: '2a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '2a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 2, 7]
      },
      {
        time: '2a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 2, 5]
      }
    ]
  },
  {
    time: '3a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '3a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 3, 8]
      },
      {
        time: '3a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 3, 1]
      }
    ]
  },
  {
    time: '4a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '4a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 4, 7]
      },
      {
        time: '4a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 4, 3]
      }
    ]
  },
  {
    time: '5a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '5a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 5, 9]
      },
      {
        time: '5a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 5, 9]
      }
    ]
  },
  {
    time: '6a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '6a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 6, 0]
      },
      {
        time: '6a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 6, 0]
      }
    ]
  },
  {
    time: '7a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '7a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 7, 0]
      },
      {
        time: '7a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 7, 2]
      }
    ]
  },
  {
    time: '8a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '8a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 8, 0]
      },
      {
        time: '8a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 8, 1]
      }
    ]
  },
  {
    time: '9a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '9a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 9, 2]
      },
      {
        time: '9a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 9, 8]
      }
    ]
  },
  {
    time: '10a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '10a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 10, 1]
      },
      {
        time: '10a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 10, 5]
      }
    ]
  },
  {
    time: '11a',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '11a',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 11, 3]
      },
      {
        time: '11a',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 11, 6]
      }
    ]
  },
  {
    time: '12p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '12p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 12, 6]
      },
      {
        time: '12p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 12, 2]
      }
    ]
  },
  {
    time: '1p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '1p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 13, 0]
      },
      {
        time: '1p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 13, 2]
      }
    ]
  },
  {
    time: '2p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '2p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 14, 2]
      },
      {
        time: '2p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 14, 0]
      }
    ]
  },
  {
    time: '3p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '3p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 15, 10]
      },
      {
        time: '3p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 15, 0]
      }
    ]
  },
  {
    time: '4p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '4p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 16, 7]
      },
      {
        time: '4p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 16, 5]
      }
    ]
  },
  {
    time: '5p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '5p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 17, 0]
      },
      {
        time: '5p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 17, 6]
      }
    ]
  },
  {
    time: '6p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '6p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 18, 3]
      },
      {
        time: '6p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 18, 7]
      }
    ]
  },
  {
    time: '7p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '7p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 19, 1]
      },
      {
        time: '7p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 19, 2]
      }
    ]
  },
  {
    time: '8p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '8p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 20, 5]
      },
      {
        time: '8p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 20, 9]
      }
    ]
  },
  {
    time: '9p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '9p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 21, 1]
      },
      {
        time: '9p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 21, 7]
      }
    ]
  },
  {
    time: '10p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '10p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 22, 14]
      },
      {
        time: '10p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 22, 8]
      }
    ]
  },
  {
    time: '11p',
    node_name: 'node1',
    node_id: 1,
    disks: [
      {
        time: '11p',
        disk_name: 'node1-disk1',
        disk_id: 1,
        nnode_id: 1,
        data: [0, 23, 15]
      },
      {
        time: '11p',
        disk_name: 'node1-disk2',
        disk_id: 2,
        nnode_id: 1,
        data: [1, 23, 8]
      }
    ]
  },

  {
    time: '12a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '12a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 0, 2]
      },
      {
        time: '12a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 0, 4]
      }
    ]
  },
  {
    time: '1a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '1a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 1, 5]
      },
      {
        time: '1a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 1, 0]
      }
    ]
  },
  {
    time: '2a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '2a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 2, 5]
      },
      {
        time: '2a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 2, 0]
      }
    ]
  },
  {
    time: '3a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '3a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 3, 6]
      },
      {
        time: '3a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 3, 0]
      }
    ]
  },
  {
    time: '4a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '4a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 4, 0]
      },
      {
        time: '4a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 4, 0]
      }
    ]
  },
  {
    time: '5a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '5a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 5, 0]
      },
      {
        time: '5a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 5, 0]
      }
    ]
  },
  {
    time: '6a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '6a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 6, 8]
      },
      {
        time: '6a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 6, 0]
      }
    ]
  },
  {
    time: '7a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '7a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 7, 5]
      },
      {
        time: '7a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 7, 6]
      }
    ]
  },
  {
    time: '8a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '8a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 8, 2]
      },
      {
        time: '8a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 8, 7]
      }
    ]
  },
  {
    time: '9a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '9a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 9, 5]
      },
      {
        time: '9a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 9, 11]
      }
    ]
  },
  {
    time: '10a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '10a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 10, 12]
      },
      {
        time: '10a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 10, 9]
      }
    ]
  },
  {
    time: '11a',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '11a',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 11, 11]
      },
      {
        time: '11a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 11, 14]
      }
    ]
  },
  {
    time: '12p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '12p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 12, 5]
      },
      {
        time: '12a',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 12, 15]
      }
    ]
  },
  {
    time: '1p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '1p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 13, 8]
      },
      {
        time: '1p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 13, 7]
      }
    ]
  },
  {
    time: '2p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '2p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 14, 5]
      },
      {
        time: '2p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 14, 12]
      }
    ]
  },
  {
    time: '3p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '3p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 15, 6]
      },
      {
        time: '3p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 15, 11]
      }
    ]
  },
  {
    time: '4p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '4p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 16, 9]
      },
      {
        time: '4p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 16, 8]
      }
    ]
  },
  {
    time: '5p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '5p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 17, 2]
      },
      {
        time: '5p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 17, 9]
      }
    ]
  },
  {
    time: '6p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '6p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 18, 14]
      },
      {
        time: '6p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 18, 10]
      }
    ]
  },
  {
    time: '7p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '7p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 19, 11]
      },
      {
        time: '7p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 19, 9]
      }
    ]
  },
  {
    time: '8p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '8p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 20, 10]
      },
      {
        time: '8p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 20, 14]
      }
    ]
  },
  {
    time: '9p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '9p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 21, 12]
      },
      {
        time: '9p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 21, 11]
      }
    ]
  },
  {
    time: '10p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '10p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 22, 11]
      },
      {
        time: '10p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 22, 14]
      }
    ]
  },
  {
    time: '11p',
    node_name: 'node2',
    node_id: 2,
    disks: [
      {
        time: '11p',
        disk_name: 'node2-disk1',
        disk_id: 1,
        nnode_id: 2,
        data: [0, 23, 15]
      },
      {
        time: '11p',
        disk_name: 'node2-disk1',
        disk_id: 2,
        nnode_id: 2,
        data: [1, 23, 15]
      }
    ]
  }
];

export default {
  name: 'Show',
  data() {
    return {
      option: {
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '80%',
          y: '10%',
          left: '5%%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: [],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          // calculable: true,
          // orient: 'horizontal',
          // left: 'center',
          top: '15%'
        },
        series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: [],
          label: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const mychat = this.$echarts.init(this.$refs.show);
      // var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];

      // var days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      // var data = [
      //   [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0],
      //   [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3],
      //   [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0],
      //   [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12],
      //   [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5],
      //   [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0],
      //   [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5],
      //   [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0],
      //   [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14],
      //   [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0],
      //   [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10],
      //   [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1],
      //   [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1],
      //   [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6], [6, 1, 0]
      // ];


      data = data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });
      this.option.xAxis.data = hours;
      this.option.yAxis.data = days;
      this.option.series[0].data = data;
      mychat.setOption(this.option);
      window.addEventListener('resize', mychat.resize);
    }
  }
};
</script>

<style>

</style>
