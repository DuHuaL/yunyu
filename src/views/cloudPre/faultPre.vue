<template>
  <div class="box">
    <div class="box-top">
      <span>故障预测</span>
      <ul>
        <li index="2" @click="toggleTab('2')" :class="{active:2 == num}"><a href="javaScript:void(0)">分析报告</a></li>
        <li index="1" @click="toggleTab('1')" :class="{active:1 == num}"><a href="javaScript:void(0)">故障预警</a></li>
      </ul>
    </div>
    <fault-warn :is="currentTab"></fault-warn>
  </div>
</template>

<script>
import AnaReport from '@/views/cloudPre/faultPrediction/anaReport';
import FaultWarn from '@/views/cloudPre/faultPrediction/faultWarn';
export default {
  components: {
    'tab_2': AnaReport,
    'tab_1': FaultWarn
  },
  data() {
    return {
      num: 1,
      currentTab: 'tab_1'
    };
  },
  methods: {
    toggleTab(index) {
      this.num = index;
      this.currentTab = 'tab_' + index;
    }
  }
};
</script>

<style>

</style>
