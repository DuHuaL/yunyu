<template>
  <div ref="faultpro" style="width:100%;height:150px;"></div>
</template>

<script>
export default {
  name: 'FaultPro',
  data() {
    return {
      option: {
        title: {
          text: '故障概率'
        },
        grid: {
          bottom: '15%',
          top: '25%'
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2018-12-12', '2018-12-13', '2018-12-14', '2018-12-15', '2018-12-16', '2018-12-17', '2018-12-18']
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['故障概率']
        },
        series: [
          {
            name: '故障概率',
            type: 'line',
            data: [3, 2, 3, 5, 0, 1,1]
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
      let myfaultpro = this.$echarts.init(this.$refs.faultpro);
      myfaultpro.setOption(this.option);
      window.addEventListener('resize', myfaultpro.resize);
    },


  }
};
</script>

<style>

</style>
