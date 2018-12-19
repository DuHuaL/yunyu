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
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="系统负载" name="first">
              <div ref="system" style="width: 100%;height: 464px;"></div>
              <!-- <speed-trend></speed-trend> -->
            </el-tab-pane>
            <el-tab-pane label="详细数据表" name="second">
              <!-- <details-table></details-table> -->
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <!-- <disk-predetails></disk-predetails> -->
        <div ref="syspredetails" style="width: 100%;height: 562px;"></div>
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
    mean_load1: '0.35',
    mean_load5: '0.38',
    mean_load15: '0.44'
  },
  {
    time: '2018-12-07',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_load1: '0.37',
    mean_load5: '0.4',
    mean_load15: '0.45'
  },
  {
    time: '2018-12-08',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_load1: '0.41',
    mean_load5: '0.4',
    mean_load15: '0.445'
  },
  {
    time: '2018-12-09',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_load1: '0.42',
    mean_load5: '0.39',
    mean_load15: '0.44'
  },
  {
    time: '2018-12-10',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_load1: '0.45',
    mean_load5: '0.42',
    mean_load15: '0.46'
  }
];
const nodes = [
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_load1: '0.4',
    mean_load5: '0.42',
    mean_load15: '0.5'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_load1: '0.38',
    mean_load5: '0.4',
    mean_load15: '0.48'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_load1: '0.42',
    mean_load5: '0.38',
    mean_load15: '0.45'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_load1: '0.46',
    mean_load5: '0.36',
    mean_load15: '0.46'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_load1: '0.48',
    mean_load5: '0.4',
    mean_load15: '0.52'
  },
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_load1: '0.3',
    mean_load5: '0.34',
    mean_load15: '0.38'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_load1: '0.36',
    mean_load5: '0.4',
    mean_load15: '0.42'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_load1: '0.4',
    mean_load5: '0.42',
    mean_load15: '0.42'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_load1: '0.38',
    mean_load5: '0.42',
    mean_load15: '0.42'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_load1: '0.42',
    mean_load5: '0.44',
    mean_load15: '0.4'
  }
];
export default {
  name: 'SysPre',
  data() {
    return {
      activeName: 'first',
      timeSys: [],
      value1: -1,
      value2: -1,
      value3: '',
      startdate: '2018-12-05',
      enddate: '2018-12-10',
      pickerOptions0: this.limitDate(),
      clusters: [],
      nodeArr: [],
      option1: {
        title: {
          text: '系统负载趋势图'
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
          data: ['1分钟负载', '5分钟负载', '15分钟负载']
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
            name: '1分钟负载',
            type: 'line',
            data: []
          },
          {
            name: '5分钟负载',
            type: 'line',
            data: []
          },
          {
            name: '15分钟负载',
            type: 'line',
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: '系统负载预测详情'
        },
        angleAxis: {
          type: 'category',
          data: ['1分钟', '5分钟', '15分钟'],
          z: 10
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            name: '起始数值',
            stack: 'a'
          },
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            name: '预测增量',
            stack: 'a'
          }
        ],
        legend: {
          show: true,
          data: ['起始数值', '预测增量'],
          y: 'bottom',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          },
          position: function(pos, params, el, elRect, size) {
            var obj = {
              top: 10
            };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          extraCssText: 'width: 100px'
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
      var mysyetem = this.$echarts.init(this.$refs.system);
      var mysyspreDetails = this.$echarts.init(this.$refs.syspredetails);
      mysyetem.setOption(this.option1);
      mysyspreDetails.setOption(this.option2);
      window.addEventListener('resize', () => {
        mysyetem.resize();
        mysyspreDetails.resize();
      });
    },
    loadData() {
      for (var a in clusters) {
        this.timeSys.push(clusters[a].time);
        if (clusters[a].time === clusters[0].time) {
          this.clusters.push(clusters[a]);
        }
        if (this.value1 === -1) {
          this.option1.xAxis.data.push(clusters[a].time);
          this.option1.series[0].data.push(clusters[a].mean_load1);
          this.option1.series[1].data.push(clusters[a].mean_load5);
          this.option1.series[2].data.push(clusters[a].mean_load15);
          if (clusters[a].time === clusters[0].time) {
            this.option2.series[0].data.push(clusters[a].mean_load1);
            this.option2.series[0].data.push(clusters[a].mean_load5);
            this.option2.series[0].data.push(clusters[a].mean_load15);
          }
          if (clusters[a].time === clusters[clusters.length - 1].time) {
            this.option2.series[1].data.push((clusters[a].mean_load1 - this.option2.series[0].data[0]).toFixed(3));
            this.option2.series[1].data.push((clusters[a].mean_load5 - this.option2.series[0].data[1]).toFixed(3));
            this.option2.series[1].data.push((clusters[a].mean_load15 - this.option2.series[0].data[2]).toFixed(3));
          }
        }
      }
    },
    limitDate() {
      var self = this;
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
      this.option2.series[0].data = [];
      this.option2.series[1].data = [];
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeSys[this.timeSys.length - 1];
      this.value3 = [];
    },
    handlechangeCluster() {
      this.publicReset();
      this.nodeArr = [];
      this.value2 = -1;
      for (var n in nodes) {
        if (this.value1 === nodes[n].cluster_id && nodes[n].time === nodes[0].time) {
          this.nodeArr.push(nodes[n]);
        }
      }
      for (var a in clusters) {
        if (this.value1 === -1) {
          this.option1.xAxis.data.push(clusters[a].time);
          this.option1.series[0].data.push(clusters[a].mean_load1);
          this.option1.series[1].data.push(clusters[a].mean_load5);
          this.option1.series[2].data.push(clusters[a].mean_load15);
          if (clusters[a].time === clusters[0].time) {
            this.option2.series[0].data.push(clusters[a].mean_load1);
            this.option2.series[0].data.push(clusters[a].mean_load5);
            this.option2.series[0].data.push(clusters[a].mean_load15);
          }
          if (clusters[a].time === clusters[clusters.length - 1].time) {
            this.option2.series[1].data.push((clusters[a].mean_load1 - this.option2.series[0].data[0]).toFixed(2));
            this.option2.series[1].data.push((clusters[a].mean_load5 - this.option2.series[0].data[1]).toFixed(2));
            this.option2.series[1].data.push((clusters[a].mean_load15 - this.option2.series[0].data[2]).toFixed(2));
          }
        } else if (this.value1 === clusters[a].cluster_id) {
          this.option1.xAxis.data.push(clusters[a].time);
          this.option1.series[0].data.push(clusters[a].mean_load1);
          this.option1.series[1].data.push(clusters[a].mean_load5);
          this.option1.series[2].data.push(clusters[a].mean_load15);
          if (clusters[a].time === clusters[0].time) {
            this.option2.series[0].data.push(clusters[a].mean_load1);
            this.option2.series[0].data.push(clusters[a].mean_load5);
            this.option2.series[0].data.push(clusters[a].mean_load15);
          }
          if (clusters[a].time === clusters[clusters.length - 1].time) {
            this.option2.series[1].data.push((clusters[a].mean_load1 - this.option2.series[0].data[0]).toFixed(2));
            this.option2.series[1].data.push((clusters[a].mean_load5 - this.option2.series[0].data[1]).toFixed(2));
            this.option2.series[1].data.push((clusters[a].mean_load15 - this.option2.series[0].data[2]).toFixed(2));
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
              this.option1.series[0].data.push(clusters[c].mean_load1);
              this.option1.series[1].data.push(clusters[c].mean_load5);
              this.option1.series[2].data.push(clusters[c].mean_load15);
              if (clusters[c].time === clusters[0].time) {
                this.option2.series[0].data.push(clusters[c].mean_load1);
                this.option2.series[0].data.push(clusters[c].mean_load5);
                this.option2.series[0].data.push(clusters[c].mean_load15);
              }
              if (clusters[c].time === clusters[clusters.length - 1].time) {
                this.option2.series[1].data.push((clusters[c].mean_load1 - this.option2.series[0].data[0]).toFixed(2));
                this.option2.series[1].data.push((clusters[c].mean_load5 - this.option2.series[0].data[1]).toFixed(2));
                this.option2.series[1].data.push((clusters[c].mean_load15 - this.option2.series[0].data[2]).toFixed(2));
              }
            }
          }
        } else if (this.value2 === nodes[a].node_id) {
          this.option1.xAxis.data.push(nodes[a].time);
          this.option1.series[0].data.push(nodes[a].mean_load1);
          this.option1.series[1].data.push(nodes[a].mean_load5);
          this.option1.series[2].data.push(nodes[a].mean_load15);
          if (nodes[a].time === nodes[0].time) {
            this.option2.series[0].data.push(nodes[a].mean_load1);
            this.option2.series[0].data.push(nodes[a].mean_load5);
            this.option2.series[0].data.push(nodes[a].mean_load15);
          }
          if (nodes[a].time === nodes[nodes.length - 1].time) {
            this.option2.series[1].data.push((nodes[a].mean_load1 - this.option2.series[0].data[0]).toFixed(2));
            this.option2.series[1].data.push((nodes[a].mean_load5 - this.option2.series[0].data[1]).toFixed(2));
            this.option2.series[1].data.push((nodes[a].mean_load15 - this.option2.series[0].data[2]).toFixed(2));
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeTime() {
      this.option2.series[0].data = [];
      this.option2.series[1].data = [];
      var newStart = this.value3[0];
      var newEnd = this.value3[1];
      var data1 = '';
      var data2 = '';
      var data3 = '';
      if (this.timeSys.indexOf(newStart) > -1 && this.timeSys.indexOf(newEnd) > -1) {
        var num1 = this.timeSys.indexOf(newStart);
        var num2 = this.timeSys.indexOf(newEnd);
        this.option1.dataZoom[0].startValue = num1;
        this.option1.dataZoom[0].endValue = num2;
      }
      for (var a in clusters) {
        if (this.value1 === -1) {
          if (clusters[a].time === newStart) {
            // this.option2.series[0].data.push(clusters[a].mean_load1);
            // this.option2.series[0].data.push(clusters[a].mean_load5);
            // this.option2.series[0].data.push(clusters[a].mean_load15);
            data1 = clusters[a].mean_load1;
            data2 = clusters[a].mean_load5;
            data3 = clusters[a].mean_load15;
            this.option2.series[0].data.push(data1, data2, data3);
          }
          if (clusters[a].time === newEnd) {
            this.option2.series[1].data.push((clusters[a].mean_load1 - data1).toFixed(2));
            this.option2.series[1].data.push((clusters[a].mean_load5 - data2).toFixed(2));
            this.option2.series[1].data.push((clusters[a].mean_load15 - data3).toFixed(2));
          }
        } else if (this.value1 !== -1) {
          if (this.value1 === clusters[a].cluster_id && this.value2 === -1) {
            if (clusters[a].time === newStart) {
              this.option2.series[0].data.push(clusters[a].mean_load1);
              this.option2.series[0].data.push(clusters[a].mean_load5);
              this.option2.series[0].data.push(clusters[a].mean_load15);
            }
            if (clusters[a].time === newEnd) {
              this.option2.series[1].data.push((clusters[a].mean_load1 - this.option2.series[0].data[0]).toFixed(2));
              this.option2.series[1].data.push((clusters[a].mean_load5 - this.option2.series[0].data[1]).toFixed(2));
              this.option2.series[1].data.push((clusters[a].mean_load15 - this.option2.series[0].data[2]).toFixed(2));
            }
          } else if (this.value2 !== -1) {
            for (var b in nodes) {
              if (this.value1 === nodes[b].cluster_id && this.value2 === nodes[b].node_id) {
                if (nodes[b].time === newStart) {
                  this.option2.series[0].data.push(nodes[b].mean_load1);
                  this.option2.series[0].data.push(nodes[b].mean_load5);
                  this.option2.series[0].data.push(nodes[b].mean_load15);
                }
                if (nodes[b].time === newEnd) {
                  this.option2.series[1].data.push((nodes[b].mean_load1 - this.option2.series[0].data[0]).toFixed(2));
                  this.option2.series[1].data.push((nodes[b].mean_load5 - this.option2.series[0].data[1]).toFixed(2));
                  this.option2.series[1].data.push((nodes[b].mean_load15 - this.option2.series[0].data[2]).toFixed(2));
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

<style>

</style>
