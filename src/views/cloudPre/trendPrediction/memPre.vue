<template>
  <div>
    <el-card>
      <h4>筛选查询</h4>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="value1" clearable @change="handlechangeCluster" placeholder="请选择">
            <el-option :value="-1" label="全部集群"></el-option>
            <el-option
              v-for="item in clusters"
              :key="item.cluster_id"
              :label="item.cluster_name"
              :value="item.cluster_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value2" @change="handlechangeNode" clearable placeholder="请选择">
            <el-option :value="-1" label="全部节点"></el-option>
            <el-option
              v-for="item1 in nodeArr"
              :key="item1.node_id"
              :label="item1.node_name"
              :value="item1.node_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-date-picker
            v-model="value3"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handlechangeTime"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="container-footer" :gutter="10">
      <el-col :span="16">
        <el-card>
          <h4>趋势预测总揽</h4>
          <el-row>
              <div ref="memory" style="width: 100%;height: 520px;"></div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <!-- <disk-predetails></disk-predetails> -->
          <div ref="mempredetails" style="width: 100%;height: 562px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const clusters = [
  {
    time: '2018-12-06',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_free: '300000',
    mean_total: '500000',
    mean_used: '200000'
  },
  {
    time: '2018-12-07',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_free: '340000',
    mean_total: '500000',
    mean_used: '160000'
  },
  {
    time: '2018-12-08',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_free: '400000',
    mean_total: '500000',
    mean_used: '100000'
  },
  {
    time: '2018-12-09',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_free: '280000',
    mean_total: '500000',
    mean_used: '220000'
  },
  {
    time: '2018-12-10',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_free: '300000',
    mean_total: '500000',
    mean_used: '200000'
  }
];

const nodes = [
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_free: '100000',
    mean_total: '200000',
    mean_used: '100000'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_free: '120000',
    mean_total: '200000',
    mean_used: '80000'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_free: '160000',
    mean_total: '200000',
    mean_used: '40000'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_free: '80000',
    mean_total: '200000',
    mean_used: '120000'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_free: '90000',
    mean_total: '200000',
    mean_used: '110000'
  },
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_free: '200000',
    mean_total: '300000',
    mean_used: '100000'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_free: '220000',
    mean_total: '300000',
    mean_used: '80000'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_free: '240000',
    mean_total: '300000',
    mean_used: '60000'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_free: '200000',
    mean_total: '300000',
    mean_used: '100000'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_free: '210000',
    mean_total: '300000',
    mean_used: '90000'
  }
];

export default {
  name: 'MemPre',
  data() {
    return {
      value1: -1,
      value2: -1,
      value3: '',
      startdate: '2018-12-05',
      enddate: '2018-12-10',
      pickerOptions0: this.limitDate(),
      activeName: 'first',
      timeMem: [],
      clusters: [],
      nodeArr: [],
      option1: {
        title: {
          text: '内存使用趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['已使用内存', '空闲内存', '总内存']
        },
        dataZoom: [
          {
            show: false,
            type: 'slider',
            startValue: 0,
            endValue: 6,
            minSpan: 8,
            dataBackground: {
              linStyle: {
                color: '#95BC2F'
              },
              areaStyle: {
                color: '#95BC2F',
                opacity: 1
              }
            }
          },
          {
            type: 'inside'
          }
        ],
        series: [
          {
            name: '已使用内存',
            type: 'line',
            data: []
          },
          {
            name: '空闲内存',
            type: 'line',
            data: []
          },
          {
            name: '总内存',
            type: 'line',
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: '内存使用详情'
        },
        tooltip: {
          formatter: '{a} <br/> {b} : {c}%'
        },
        series: [
          {
            name: '内存使用率',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 50, name: '使用率'}]
          }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var myMemory = this.$echarts.init(this.$refs.memory);
      var myMempreDetails = this.$echarts.init(this.$refs.mempredetails);
      myMemory.setOption(this.option1);
      myMempreDetails.setOption(this.option2);
      window.addEventListener('resize', () => {
        myMemory.resize();
        myMempreDetails.resize();
      });
    },
    loadData() {
      for (var a in clusters) {
        this.timeMem.push(clusters[a].time);
        if (clusters[a].time === clusters[0].time) {
          this.clusters.push(clusters[a]);
        }
        if (this.value1 === -1) {
          this.option1.xAxis.data.push(clusters[a].time);
          this.option1.series[0].data.push(clusters[a].mean_used);
          this.option1.series[1].data.push(clusters[a].mean_free);
          this.option1.series[2].data.push(clusters[a].mean_total);
          if (clusters[a].time === clusters[clusters.length - 1].time) {
            this.option2.series[0].data[0].value = (clusters[a].mean_used / clusters[a].mean_total) * 100;
          }
        }
      }
    },
    limitDate() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(self.startdate).getTime() || time.getTime() > new Date(self.enddate).getTime();
        }
      };
    },
    publicReset() {
      this.option1.xAxis.data = [];
      this.option1.series[0].data = [];
      this.option1.series[1].data = [];
      this.option1.series[2].data = [];
      this.option2.series[0].data[0].value = '';
      this.value3 = '';
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeMem[this.timeMem.length - 1];
    },
    handlechangeCluster() {
      this.nodeArr = [];
      this.value2 = -1;
      this.publicReset();
      for (var a in nodes) {
        if (this.value1 === nodes[a].cluster_id && nodes[a].time === nodes[0].time) {
          this.nodeArr.push(nodes[a]);
        }
      }
      for (var b in clusters) {
        if (this.value1 === -1) {
          this.option1.xAxis.data.push(clusters[b].time);
          this.option1.series[0].data.push(clusters[b].mean_used);
          this.option1.series[1].data.push(clusters[b].mean_free);
          this.option1.series[2].data.push(clusters[b].mean_total);
          if (clusters[b].time === clusters[clusters.length - 1].time) {
            this.option2.series[0].data[0].value = (clusters[b].mean_used / clusters[b].mean_total) * 100;
          }
        } else if (this.value1 !== -1) {
          if (this.value1 === clusters[b].cluster_id) {
            this.option1.xAxis.data.push(clusters[b].time);
            this.option1.series[0].data.push(clusters[b].mean_used);
            this.option1.series[1].data.push(clusters[b].mean_free);
            this.option1.series[2].data.push(clusters[b].mean_total);
            if (clusters[b].time === clusters[clusters.length - 1].time) {
              this.option2.series[0].data[0].value = (clusters[b].mean_used / clusters[b].mean_total) * 100;
            }
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeNode() {
      this.publicReset();
      for (var a in nodes) {
        if (this.value2 === -1) {
          this.publicReset();
          for (var c in clusters) {
            if (this.value1 === clusters[c].cluster_id) {
              this.option1.xAxis.data.push(clusters[c].time);
              this.option1.series[0].data.push(clusters[c].mean_used);
              this.option1.series[1].data.push(clusters[c].mean_free);
              this.option1.series[2].data.push(clusters[c].mean_total);
              if (clusters[c].time === clusters[clusters.length - 1].time) {
                this.option2.series[0].data[0].value = (clusters[c].mean_used / clusters[c].mean_total) * 100;
              }
            }
          }
        } else if (this.value2 === nodes[a].node_id) {
          this.option1.xAxis.data.push(nodes[a].time);
          this.option1.series[0].data.push(nodes[a].mean_used);
          this.option1.series[1].data.push(nodes[a].mean_free);
          this.option1.series[2].data.push(nodes[a].mean_total);
          if (nodes[a].time === nodes[nodes.length - 1].time) {
            this.option2.series[0].data[0].value = ((nodes[a].mean_used / nodes[a].mean_total) * 100).toFixed(2);
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeTime() {
      this.option2.series[0].data[0].value = '';
      var newStart = this.value3[0];
      var newEnd = this.value3[1];
      if (this.timeMem.indexOf(newStart) > -1 && this.timeMem.indexOf(newEnd) > -1) {
        var num1 = this.timeMem.indexOf(newStart);
        var num2 = this.timeMem.indexOf(newEnd);
        this.option1.dataZoom[0].startValue = num1;
        this.option1.dataZoom[0].endValue = num2;
      }
      for (var a in clusters) {
        if (this.value1 === -1 && clusters[a].time === newEnd) {
          this.option2.series[0].data[0].value = (clusters[a].mean_used / clusters[a].mean_total) * 100;
        } else if (this.value1 === clusters[a].cluster_id && clusters[a].time === newEnd) {
          this.option2.series[0].data[0].value = (clusters[a].mean_used / clusters[a].mean_total) * 100;
          for (var b in nodes) {
            if (this.value2 === nodes[b].node_id && nodes[b].time === newEnd) {
              this.option2.series[0].data[0].value = ((nodes[b].mean_used / nodes[b].mean_total) * 100).toFixed(2);
            }
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
