<template>
  <div class="box">
    <div class="box-top">
      <span>趋势预测</span>
      <ul>
        <li index="5" @click="toggleTab('5')" :class="{active:5 == num}"><a href="javaScript:void(0)">内存</a></li>
        <li index="4" @click="toggleTab('4')" :class="{active:4 == num}"><a href="javaScript:void(0)">系统负载</a></li>
        <li index="3" @click="toggleTab('3')" :class="{active:3 == num}"><a href="javaScript:void(0)">网络IO</a></li>
        <li index="2" @click="toggleTab('2')" :class="{active:2 == num}"><a href="javaScript:void(0)">硬盘IO</a></li>
        <li index="1" @click="toggleTab('1')" :class="{active:1 == num}"><a href="javaScript:void(0)">CPU</a></li>
      </ul>
    </div>
    <div class="box-container">
      <cpu-pre :is="currentTab"></cpu-pre>
    </div>
  </div>
</template>

<script>
import CpuPre from '@/views/cloudPre/trendPrediction/cpuPre';
import DiskPre from '@/views/cloudPre/trendPrediction/diskPre';
import NetPre from '@/views/cloudPre/trendPrediction/netPre';
import SysPre from '@/views/cloudPre/trendPrediction/sysPre';
import MemPre from '@/views/cloudPre/trendPrediction/MemPre';
export default {
  data() {
    return {
      num: 1,
      currentTab: 'Tab_1'
    };
  },
  components: {
    'Tab_1': CpuPre,
    'Tab_2': DiskPre,
    'Tab_3': NetPre,
    'Tab_4': SysPre,
    'Tab_5': MemPre

  },
  methods: {
    toggleTab(index) {
      this.num = index;
      this.currentTab = 'Tab_' + index;
    }
  }
};
</script>

<style>
</style>
