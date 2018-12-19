<template>
  <div ref="failuredis" style="width:100%;height:395px;"></div>
</template>

<script>
export default {
  name: 'FailureDis',
  data() {
    return {
      option: {
        color: ['blue'],
        xAxis: {
          type: 'category',
          data: ['node1_disk1', 'node1_disk2', 'node1_disk3', 'node1_disk4', 'node1_disk5']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            borderWidth: 3
          }
        },
        series: [
          {
            data: [1, 2, 5, 3, 4],
            barWidth: '70%',
            type: 'bar'
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myfailureDis = this.$echarts.init(this.$refs.failuredis);
      myfailureDis.setOption(this.option);
      window.addEventListener('resize', myfailureDis.resize);
    }
  }
};
</script>

<style>

</style>
