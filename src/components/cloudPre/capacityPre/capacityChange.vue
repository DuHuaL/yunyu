<template>
  <div id="id" style="width: 100%; height: 460px;"></div>
</template>
<script>
export default {
  name: 'CapacityChange',
  data() {
    return {
      chart1: ''
    };
  },
  props: {
    id: {
      type: String
    },
    option1: {
      type: Object,
      default() {
        return {
          title: {
            text: '容量趋势图'
          },
          legend: {
            data: ['已用容量', '未用容量']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2018-1-1', '2018-1-2', '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6', '2018-1-7']
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: [
            {
              name: '已用容量',
              type: 'line',
              data: [20, 20, 30, 40, 20, 10, 60]
            },
            {
              name: '未用容量',
              type: 'line',
              data: [90, 70, 60, 60, 80, 90, 40]
            }
          ]
        };
      }
    }
  },
  mounted() {
    this.init1();
  },
  methods: {
    async init1() {
      this.chart1 = this.$echarts.init(document.getElementById(this.id));
      this.chart1.setOption(this.option1);
      window.addEventListener('resize', this.chart1.resize);
    }
  },
  watch: {
    option1: {
      handler(newVal, oldVal) {
        if (this.chart1) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart1.setOption(oldVal);
          }
        } else {
          this.init();
        }
      }
    },
    deep: true
  }
};
</script>

<style>

</style>
