<template>
  <div ref="contrast" style="width:100%;height:300px;"></div>
</template>

<script>
export default {
  name: 'Contrast',
  data() {
    return {
      option: {
        title: {
          text: '热点对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['集群', '节点', '硬盘', 'CPU']
        },
        legend: {
          data: [{name: '热点', icon: 'rect'}, {name: '总量', icon: 'rect'}]
        },
        series: [
          {
            name: '热点',
            type: 'bar',
            data: [2, 3, 4, 4]
          },
          {
            name: '总量',
            type: 'bar',
            data: [2, 4, 8, 8]
          }
        ]
      }
    };
  },
  created() {
    // this.loadData();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myContrast = this.$echarts.init(this.$refs.contrast);
      myContrast.setOption(this.option);
      window.addEventListener('resize', function() {
        myContrast.resize();
      });
    },
    // async loadData() {
    //   const res1 = await this.$http.get('cpu_predict_hot_spot/');
    //   const data1 = res1.data;
    //   let num1 = data1.hot_cpu_num;
    //   let num2 = data1.total_cpu_num;
    //   // 获取cpu热点中的热点集群
    //   let cpuCluster = data1.hot_clusters;
    //   // 获取cpu中的热点节点
    //   let cpuNode = data1.hot_nodes;
    //   const res2 = await this.$http.get('disk_predict_hot_spot/');
    //   const data2 = res2.data;
    //   let num3 = data2.hot_disk_num;
    //   let num4 = data2.total_disk_num;
    //   // 获取热点硬盘中的热点集群
    //   let diskCluster = data2.hot_clusters;
    //   // 获取热点硬盘中的热点节点
    //   let diskNode = data2.hot_nodes;
    //   const res3 = await this.$http.get('nodes/');
    //   const data3 = res3.data;
    //   let nodes = data3.length;
    //   const res4 = await this.$http.get('clusters/');
    //   const data4 = res4.data;
    //   var clusters = data4.length;
    //   // 合并热点硬盘和热点cpu中的总集群
    //   let newClusterArr = cpuCluster.concat(diskCluster);
    //   let hotCluster = [];
    //   // 去掉重复的热点集群
    //   for (var i = 0; i < newClusterArr.length; i++) {
    //     if (hotCluster.indexOf(newClusterArr[i]) === -1) {
    //       hotCluster.push(newClusterArr[i]);
    //     }
    //   }
    //   // 合并热点cpu和热点硬盘中的总节点
    //   let newNodeArr = cpuNode.concat(diskNode);
    //   let hotNode = [];
    //   // 去点共同的热点节点
    //   for (var j = 0; j < newNodeArr.length; j++) {
    //     if (hotNode.indexOf(newNodeArr[j]) === -1) {
    //       hotNode.push(newNodeArr[i]);
    //     }
    //   }
    //   this.option.series[0].data.push(hotCluster.length);
    //   this.option.series[0].data.push(hotNode.length);
    //   this.option.series[0].data.push(num3);
    //   this.option.series[0].data.push(num1);
    //   this.option.series[1].data.push(clusters);
    //   this.option.series[1].data.push(nodes);
    //   this.option.series[1].data.push(num4);
    //   this.option.series[1].data.push(num2);
    //   this.$nextTick(() => {
    //     this.init();
    //   });
    // }
  }
};
</script>

<style>

</style>
