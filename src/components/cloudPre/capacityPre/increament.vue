<template>
  <div id="increament" style="width: 100%; height: 460px;"></div>
</template>

<script>
export default {
  name: 'Increament',
  data() {
    return {
      option2: {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          axisTick: {show: false},
          data: []
        },
        legend: {
          data: ['已用', '未用']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [
          {
            name: '已用',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'left'
              }
            },
            data: []
          },
          {
            name: '未用',
            type: 'bar',
            label: {
              normal: {
                show: true
              }
            },
            data: []
          }
        ]
      }
    };
  }
};
</script>

<style>

</style>
