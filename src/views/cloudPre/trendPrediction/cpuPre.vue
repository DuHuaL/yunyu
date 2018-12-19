<template>
  <div>
    <el-card>
      <h4>筛选查询</h4>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="value1" clearable @change="handlechangeCluster" placeholder="选择">
            <el-option label="全部集群" :value="-1"></el-option>
            <el-option
              v-for="item in clusters"
              :key="item.cluster_id"
              :label="item.cluster_name"
              :value="item.cluster_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value2" @change="handlechangeNode"  placeholder="请选择">
            <el-option label="全部节点" :value="-1"></el-option>
            <el-option
              v-for="item1 in nodeArr"
              :key="item1.node_id"
              :label="item1.node_name"
              :value="item1.node_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value3" @change="handlechangeCpu"  placeholder="请选择">
            <el-option label="全部CPU" :value="-1"></el-option>
            <el-option
              v-for="item2 in cpuArr"
              :key="item2.cpu_id"
              :label="item2.cpu_name"
              :value="item2.cpu_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-date-picker
            editable
            v-model="value4"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handlechangeTime"
            value-format="yyyy-MM-dd"
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
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane label="CPU趋势" name="first">
                    <div ref="cpuTrend" style="width: 100%; height:464px;"></div>
                  </el-tab-pane>
                  <el-tab-pane label="详细数据表" name="second">
                    <!-- <div ref="detailsTable" style="width: 100%;height: 460px;"></div> -->
                  </el-tab-pane>
                </el-tabs>
              </el-row>
            </el-card>
      </el-col>
      <el-col :span="8">
            <el-card>
              <div ref="cpuDetails" style="width: 100%;height: 562px;"></div>
            </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const clusters = [
  {
    time: '2018-12-06',
    cluster_id: 1,
    cluster_name: 'clustertext',
    mean_usage_system: '1.125',
    mean_usage_user: '2.275',
    mean_usage_idle: '96.6'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    cluster_name: 'clustertext',
    mean_usage_system: '1.25',
    mean_usage_user: '2.775',
    mean_usage_idle: '95.975'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    cluster_name: 'clustertext',
    mean_usage_system: '1.55',
    mean_usage_user: '2.675',
    mean_usage_idle: '95.775'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    cluster_name: 'clustertext',
    mean_usage_system: '1.415',
    mean_usage_user: '2.76',
    mean_usage_idle: '95.825'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    cluster_name: 'clustertext',
    mean_usage_system: '1.575',
    mean_usage_user: '2.925',
    mean_usage_idle: '95.5'
  }
];

const nodes = [
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_id: 1,
    node_name: 'node1',
    mean_usage_system: '1.0',
    mean_usage_user: '1.9',
    mean_usage_idle: '97.1'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_id: 1,
    node_name: 'node1',
    mean_usage_system: '1.1',
    mean_usage_user: '2.85',
    mean_usage_idle: '96.05'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_id: 1,
    node_name: 'node1',
    mean_usage_system: '1.5',
    mean_usage_user: '2.9',
    mean_usage_idle: '95.6'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_id: 1,
    node_name: 'node1',
    mean_usage_system: '0.98',
    mean_usage_user: '2.62',
    mean_usage_idle: '96.4'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_id: 1,
    node_name: 'node1',
    mean_usage_system: '1.5',
    mean_usage_user: '3.4',
    mean_usage_idle: '95.1'
  },
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_id: 2,
    node_name: 'node2',
    mean_usage_system: '1.25',
    mean_usage_user: '2.65',
    mean_usage_idle: '96.1'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_id: 2,
    node_name: 'node2',
    mean_usage_system: '1.4',
    mean_usage_user: '2.7',
    mean_usage_idle: '95.9'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_id: 2,
    node_name: 'node2',
    mean_usage_system: '1.6',
    mean_usage_user: '2.45',
    mean_usage_idle: '95.95'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_id: 2,
    node_name: 'node2',
    mean_usage_system: '1.85',
    mean_usage_user: '2.9',
    mean_usage_idle: '95.25'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_id: 2,
    node_name: 'node2',
    mean_usage_system: '1.65',
    mean_usage_user: '2.45',
    mean_usage_idle: '95.9'
  }
];

const cpus = [
  {
    time: '2018-12-06',
    cpu_id: 1,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu1',
    mean_usage_system: '1.2',
    mean_usage_user: '2.6',
    mean_usage_idle: '96.2'
  },
  {
    time: '2018-12-07',
    cpu_id: 1,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu1',
    mean_usage_system: '1.0',
    mean_usage_user: '2.7',
    mean_usage_idle: '96.3'
  },
  {
    time: '2018-12-08',
    cpu_id: 1,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu1',
    mean_usage_system: '1.6',
    mean_usage_user: '2.2',
    mean_usage_idle: '96.2'
  },
  {
    time: '2018-12-09',
    cpu_id: 1,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu1',
    mean_usage_system: '0.8',
    mean_usage_user: '2.4',
    mean_usage_idle: '96.8'
  },
  {
    time: '2018-12-10',
    cpu_id: 1,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu1',
    mean_usage_system: '1.4',
    mean_usage_user: '2.6',
    mean_usage_idle: '96'
  },
  {
    time: '2018-12-06',
    cpu_id: 2,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu2',
    mean_usage_system: '0.8',
    mean_usage_user: '1.2',
    mean_usage_idle: '98'
  },
  {
    time: '2018-12-07',
    cpu_id: 2,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu2',
    mean_usage_system: '1.2',
    mean_usage_user: '3.0',
    mean_usage_idle: '95.8'
  },
  {
    time: '2018-12-08',
    cpu_id: 2,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu2',
    mean_usage_system: '1.4',
    mean_usage_user: '3.6',
    mean_usage_idle: '95'
  },
  {
    time: '2018-12-09',
    cpu_id: 2,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu2',
    mean_usage_system: '1.16',
    mean_usage_user: '2.84',
    mean_usage_idle: '96'
  },
  {
    time: '2018-12-10',
    cpu_id: 2,
    node_id: 1,
    cluster_id: 1,
    cpu_name: 'node1-cpu2',
    mean_usage_system: '1.6',
    mean_usage_user: '4.2',
    mean_usage_idle: '94.2'
  },
  {
    time: '2018-12-06',
    cpu_id: 1,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu1',
    mean_usage_system: '1.4',
    mean_usage_user: '2.6',
    mean_usage_idle: '96'
  },
  {
    time: '2018-12-07',
    cpu_id: 1,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu1',
    mean_usage_system: '1.6',
    mean_usage_user: '2.8',
    mean_usage_idle: '95.6'
  },
  {
    time: '2018-12-08',
    cpu_id: 1,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu1',
    mean_usage_system: '1.8',
    mean_usage_user: '2.4',
    mean_usage_idle: '95.8'
  },
  {
    time: '2018-12-09',
    cpu_id: 1,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu1',
    mean_usage_system: '2.2',
    mean_usage_user: '3.0',
    mean_usage_idle: '94.8'
  },
  {
    time: '2018-12-10',
    cpu_id: 1,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu1',
    mean_usage_system: '2.0',
    mean_usage_user: '2.7',
    mean_usage_idle: '95.3'
  },
  {
    time: '2018-12-06',
    cpu_id: 2,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu2',
    mean_usage_system: '1.1',
    mean_usage_user: '2.7',
    mean_usage_idle: '96.2'
  },
  {
    time: '2018-12-07',
    cpu_id: 2,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu2',
    mean_usage_system: '1.2',
    mean_usage_user: '2.6',
    mean_usage_idle: '96.2'
  },
  {
    time: '2018-12-08',
    cpu_id: 2,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu2',
    mean_usage_system: '1.4',
    mean_usage_user: '2.5',
    mean_usage_idle: '96.1'
  },
  {
    time: '2018-12-09',
    cpu_id: 2,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu2',
    mean_usage_system: '1.5',
    mean_usage_user: '2.8',
    mean_usage_idle: '95.7'
  },
  {
    time: '2018-12-10',
    cpu_id: 2,
    node_id: 2,
    cluster_id: 1,
    cpu_name: 'node2-cpu2',
    mean_usage_system: '1.3',
    mean_usage_user: '2.2',
    mean_usage_idle: '96.5'
  }
];

export default {
  name: 'CpuPre',
  data() {
    return {
      clusters: [],
      nodeArr: [],
      cpuArr: [],
      value1: -1,
      value2: -1,
      value3: -1,
      value4: '',
      startdate: '2018-12-05',
      enddate: '2018-12-10',
      pickerOptions0: this.limitDate(),
      activeName: 'first',
      timeCpu: [],
      option1: {
        title: {
          text: 'CPU趋势图'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
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
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['系统使用率', '用户使用率', '空闲率']
        },
        series: [
          {
            name: '系统使用率',
            type: 'line',
            data: []
          },
          {
            name: '用户使用率',
            type: 'line',
            data: []
          },
          {
            name: '空闲率',
            type: 'line',
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: 'CPU预测详情'
        },
        angleAxis: {},
        radiusAxis: {
          type: 'category',
          data: ['系统', '用户', '空闲'],
          z: 10
        },
        polar: {
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            name: '系统',
            stack: 'a'
          },
          {
            name: '用户',
            coordinateSystem: 'polar',
            type: 'bar',
            data: [],
            stack: 'a'
          },
          {
            name: '空闲',
            coordinateSystem: 'polar',
            type: 'bar',
            data: [],
            stack: 'a'
          }
        ],
        legend: {
          // show: true,
          data: [
            {
              name: '预测增加',
              icon: 'rect'
            },
            {
              name: '预测减少',
              icon: 'rect'
            }
          ],
          y: 'bottom',
          x: 'center'
        }
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
      let mycpuTrend = this.$echarts.init(this.$refs.cpuTrend);
      let mycpudetails = this.$echarts.init(this.$refs.cpuDetails);
      mycpuTrend.setOption(this.option1);
      mycpudetails.setOption(this.option2);
      window.addEventListener('resize', function() {
        mycpuTrend.resize();
        mycpudetails.resize();
      });
    },
    loadData() {
      for (var a in clusters) {
        this.timeCpu.push(clusters[a].time);
        if (clusters[a].time === clusters[0].time) {
          this.clusters.push(clusters[a]);
        }
        this.option1.xAxis.data.push(clusters[a].time);
        this.option1.series[0].data.push(clusters[a].mean_usage_system);
        this.option1.series[1].data.push(clusters[a].mean_usage_user);
        this.option1.series[2].data.push(clusters[a].mean_usage_idle);
        if (clusters[a].time === clusters[clusters.length - 1].time) {
          var data4 = clusters[a].mean_usage_system;
          var data5 = clusters[a].mean_usage_user;
          var data6 = clusters[a].mean_usage_idle;
          this.option2.series[0].data.push(data4, data5, data6);
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
    plugin() {
      this.option1.xAxis.data = [];
      this.option1.series[0].data = [];
      this.option1.series[1].data = [];
      this.option1.series[2].data = [];
      this.option2.series[0].data = [];
      this.value4 = '';
    },
    handlechangeCluster() {
      this.nodeArr = [];
      this.cpuArr = [];
      this.value2 = -1;
      this.value3 = -1;
      this.plugin();
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeCpu[this.timeCpu.length - 1];
      for (var a in nodes) {
        if (this.value1 === nodes[a].cluster_id && nodes[a].time === nodes[0].time) {
          this.nodeArr.push(nodes[a]);
        }
      }
      for (var b in clusters) {
        if (this.value1 === -1) {
          this.option1.xAxis.data.push(clusters[b].time);
          this.option1.series[0].data.push(clusters[b].mean_usage_system);
          this.option1.series[1].data.push(clusters[b].mean_usage_user);
          this.option1.series[2].data.push(clusters[b].mean_usage_idle);
          if (clusters[b].time === clusters[clusters.length - 1].time) {
            var data1 = clusters[b].mean_usage_system;
            var data2 = clusters[b].mean_usage_user;
            var data3 = clusters[b].mean_usage_idle;
            this.option2.series[0].data.push(data1, data2, data3);
          }
        } else if (this.value1 === clusters[b].cluster_id) {
          this.option1.xAxis.data.push(clusters[b].time);
          this.option1.series[0].data.push(clusters[b].mean_usage_system);
          this.option1.series[1].data.push(clusters[b].mean_usage_user);
          this.option1.series[2].data.push(clusters[b].mean_usage_idle);
          if (clusters[b].time === clusters[clusters.length - 1].time) {
            var data4 = clusters[b].mean_usage_system;
            var data5 = clusters[b].mean_usage_user;
            var data6 = clusters[b].mean_usage_idle;
            this.option2.series[0].data.push(data4, data5, data6);
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeNode() {
      this.plugin();
      this.cpuArr = [];
      this.value3 = -1;
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeCpu[this.timeCpu.length - 1];
      for (var a in cpus) {
        if (this.value2 === cpus[a].node_id && cpus[a].time === cpus[cpus.length - 1].time) {
          this.cpuArr.push(cpus[a]);
        }
      }
      for (var b in nodes) {
        if (this.value2 === -1) {
          this.plugin();
          for (var c in clusters) {
            this.option1.xAxis.data.push(clusters[c].time);
            this.option1.series[0].data.push(clusters[c].mean_usage_system);
            this.option1.series[1].data.push(clusters[c].mean_usage_user);
            this.option1.series[2].data.push(clusters[c].mean_usage_idle);
            if (clusters[c].time === clusters[clusters.length - 1].time) {
              var data4 = clusters[c].mean_usage_system;
              var data5 = clusters[c].mean_usage_user;
              var data6 = clusters[c].mean_usage_idle;
              this.option2.series[0].data.push(data4, data5, data6);
            }
          }
        } else if (this.value2 === nodes[b].node_id) {
          this.option1.xAxis.data.push(nodes[b].time);
          this.option1.series[0].data.push(nodes[b].mean_usage_system);
          this.option1.series[1].data.push(nodes[b].mean_usage_user);
          this.option1.series[2].data.push(nodes[b].mean_usage_idle);
          if (nodes[b].time === nodes[nodes.length - 1].time) {
            this.option2.series[0].data.push(nodes[b].mean_usage_system);
            this.option2.series[0].data.push(nodes[b].mean_usage_user);
            this.option2.series[0].data.push(nodes[b].mean_usage_idle);
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeCpu() {
      this.plugin();
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeCpu[this.timeCpu.length - 1];
      for (var a in cpus) {
        if (this.value3 === -1) {
          this.plugin();
          for (var b in nodes) {
            if (this.value2 === nodes[b].node_id) {
              this.option1.xAxis.data.push(nodes[b].time);
              this.option1.series[0].data.push(nodes[b].mean_usage_system);
              this.option1.series[1].data.push(nodes[b].mean_usage_user);
              this.option1.series[2].data.push(nodes[b].mean_usage_idle);
              if (nodes[b].time === nodes[nodes.length - 1].time) {
                var data1 = nodes[b].mean_usage_system;
                var data2 = nodes[b].mean_usage_user;
                var data3 = nodes[b].mean_usage_idle;
                this.option2.series[0].data.push(data1, data2, data3);
              }
            }
          }
        } else if (this.value3 === cpus[a].cpu_id && this.value2 === cpus[a].node_id) {
          this.option1.xAxis.data.push(cpus[a].time);
          this.option1.series[0].data.push(cpus[a].mean_usage_system);
          this.option1.series[1].data.push(cpus[a].mean_usage_user);
          this.option1.series[2].data.push(cpus[a].mean_usage_idle);
          if (cpus[a].time === cpus[cpus.length - 1].time) {
            var data4 = cpus[a].mean_usage_system;
            var data5 = cpus[a].mean_usage_user;
            var data6 = cpus[a].mean_usage_idle;
            this.option2.series[0].data.push(data4, data5, data6);
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeTime() {
      this.option2.series[0].data = [];
      // 没有选择条件
      var newStart = this.value4[0];
      var newEnd = this.value4[1];
      if (this.timeCpu.indexOf(newStart) > -1 && this.timeCpu.indexOf(newEnd) > -1) {
        var num1 = this.timeCpu.indexOf(newStart);
        var num2 = this.timeCpu.indexOf(newEnd);
        this.option1.dataZoom[0].startValue = num1;
        this.option1.dataZoom[0].endValue = num2;
      }

      for (var a in clusters) {
        if (this.value1 === -1 && clusters[a].time === newEnd) {
          this.option2.series[0].data.push(clusters[a].mean_usage_system);
          this.option2.series[0].data.push(clusters[a].mean_usage_user);
          this.option2.series[0].data.push(clusters[a].mean_usage_idle);
        } else if (this.value1 === clusters[a].cluster_id && clusters[a].time === newEnd) {
          this.option2.series[0].data.push(clusters[a].mean_usage_system);
          this.option2.series[0].data.push(clusters[a].mean_usage_user);
          this.option2.series[0].data.push(clusters[a].mean_usage_idle);

          for (var b in nodes) {
            if (this.value2 === nodes[b].node_id && nodes[b].time === newEnd) {
              this.option2.series[0].data = [];
              this.option2.series[0].data.push(nodes[b].mean_usage_system);
              this.option2.series[0].data.push(nodes[b].mean_usage_user);
              this.option2.series[0].data.push(nodes[b].mean_usage_idle);
              for (var c in cpus) {
                if (this.value3 === cpus[c].cpu_id && cpus[c].time === newEnd && this.value2 === cpus[c].node_id) {
                  this.option2.series[0].data = [];
                  this.option2.series[0].data.push(cpus[c].mean_usage_system);
                  this.option2.series[0].data.push(cpus[c].mean_usage_user);
                  this.option2.series[0].data.push(cpus[c].mean_usage_idle);
                }
              }
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

</style>
