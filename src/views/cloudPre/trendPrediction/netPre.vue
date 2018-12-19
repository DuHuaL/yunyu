<template>
<div>
  <el-card>
    <h4>筛选查询</h4>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-select v-model="value1" @change="handlechangeCluster" placeholder="请选择">
          <el-option :value="-1" label="全部集群"></el-option>
          <el-option
            v-for="item in clusterArr"
            :key="item.cluster_id"
            :label="item.cluster_name"
            :value="item.cluster_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value2" @change="handlechangeNode" placeholder="请选择">
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
          editable
          v-model="value3"
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
            <el-tab-pane label="收/发字节" name="first">
            <div ref="bytes" style="width: 1117px;height: 464px;"></div>
              <!-- <speed-trend></speed-trend> -->
            </el-tab-pane>
            <el-tab-pane label="出/入丢包数" name="second">
              <!-- <amount-trend></amount-trend> -->
              <div ref="drop" style="width: 1117px; height: 464px;"></div>
            </el-tab-pane>
            <el-tab-pane label="出/入误包数" name="third">
              <!-- <time-trend></time-trend> -->
              <div ref="error" style="width: 1117px; height: 464px;"></div>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <!-- <disk-predetails></disk-predetails> -->
        <div ref="diskpredetails" style="width: 100%;height: 562px;"></div>
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
    mean_bytes_recv: '15000',
    mean_bytes_sent: '25000',
    mean_drop_in: '200',
    mean_drop_out: '45',
    mean_err_in: '4',
    mean_err_out: '4'
  },
  {
    time: '2018-12-07',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_bytes_recv: '21000',
    mean_bytes_sent: '28500',
    mean_drop_in: '160',
    mean_drop_out: '50',
    mean_err_in: '5',
    mean_err_out: '4'
  },
  {
    time: '2018-12-08',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_bytes_recv: '11500',
    mean_bytes_sent: '23000',
    mean_drop_in: '150',
    mean_drop_out: '40',
    mean_err_in: '7.5',
    mean_err_out: '5'
  },
  {
    time: '2018-12-09',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_bytes_recv: '21000',
    mean_bytes_sent: '31000',
    mean_drop_in: '230',
    mean_drop_out: '40',
    mean_err_in: '6',
    mean_err_out: '2'
  },
  {
    time: '2018-12-10',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_bytes_recv: '23000',
    mean_bytes_sent: '33000',
    mean_drop_in: '230',
    mean_drop_out: '50',
    mean_err_in: '6',
    mean_err_out: '2'
  }
];

const nodes = [
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_bytes_recv: '10000 ',
    mean_bytes_sent: '20000',
    mean_drop_in: '200',
    mean_drop_out: '50',
    mean_err_in: '4',
    mean_err_out: '5'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_bytes_recv: '20000',
    mean_bytes_sent: '25000',
    mean_drop_in: '100',
    mean_drop_out: '40',
    mean_err_in: '5',
    mean_err_out: '6'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_bytes_recv: '15000',
    mean_bytes_sent: '18000',
    mean_drop_in: '120',
    mean_drop_out: '60',
    mean_err_in: '7',
    mean_err_out: '8'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_bytes_recv: '18000',
    mean_bytes_sent: '28000',
    mean_drop_in: '220',
    mean_drop_out: '30',
    mean_err_in: '6',
    mean_err_out: '2'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_name: 'node1',
    node_id: 1,
    mean_bytes_recv: '22000',
    mean_bytes_sent: '32000',
    mean_drop_in: '240',
    mean_drop_out: '40',
    mean_err_in: '8',
    mean_err_out: '4'
  },
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_bytes_recv: '20000',
    mean_bytes_sent: '30000',
    mean_drop_in: '200',
    mean_drop_out: '40',
    mean_err_in: '4',
    mean_err_out: '3'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_bytes_recv: '22000',
    mean_bytes_sent: '32000',
    mean_drop_in: '220',
    mean_drop_out: '60',
    mean_err_in: '5',
    mean_err_out: '2'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_bytes_recv: '18000',
    mean_bytes_sent: '28000',
    mean_drop_in: '180',
    mean_drop_out: '20',
    mean_err_in: '8',
    mean_err_out: '2'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_bytes_recv: '24000',
    mean_bytes_sent: '34000',
    mean_drop_in: '240',
    mean_drop_out: '50',
    mean_err_in: '6',
    mean_err_out: '4'
  },
  {
    time: '2018-12-10',
    cluster_id: 1,
    node_name: 'node2',
    node_id: 2,
    mean_bytes_recv: '24000',
    mean_bytes_sent: '34000',
    mean_drop_in: '220',
    mean_drop_out: '60',
    mean_err_in: '4',
    mean_err_out: '2'
  }
];

export default {
  name: 'NetPre',
  data() {
    return {
      clusterArr: [],
      nodeArr: [],
      value1: -1,
      value2: -1,
      value3: '',
      startdate: '2018-12-05',
      enddate: '2018-12-10',
      pickerOptions0: this.limitDate(),
      activeName: 'first',
      timeNet: [],
      option1: {
        title: {
          text: '网络IO趋势图'
        },
        xAxis: {
          data: [],
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['接受字节', '发送字节']
        },
        tooltip: {
          trigger: 'axis'
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
            name: '接受字节',
            type: 'line',
            data: []
          },
          {
            name: '发送字节',
            type: 'line',
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: '网络IO趋势图'
        },
        xAxis: {
          data: [],
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['丢包数(出)', '丢包数(入)']
        },
        tooltip: {
          trigger: 'axis'
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
            name: '丢包数(出)',
            type: 'line',
            data: []
          },
          {
            name: '丢包数(入)',
            type: 'line',
            data: []
          }
        ]
      },
      option3: {
        title: {
          text: '网络IO趋势图'
        },
        xAxis: {
          data: [],
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['误包数(出)', '误包数(入)']
        },
        tooltip: {
          trigger: 'axis'
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
            name: '误包数(出)',
            type: 'line',
            data: []
          },
          {
            name: '误包数(入)',
            type: 'line',
            data: []
          }
        ]
      },
      option4: {
        title: {
          text: '网络预测详情'
        },
        xAxis: {
          data: ['收/发字节', '入/出丢包数', '入/出误包数'],
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '接收字节',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '错误/丢包率',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        animationDurationUpdate: 1200,
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ddd'
              }
            },
            silent: true,
            barWidth: 40,
            barGap: '-75%', // Make series be overlap
            data: []
          },
          {
            type: 'bar',
            barWidth: 20,
            z: 10,
            data: []
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
      var myBytes = this.$echarts.init(this.$refs.bytes);
      var myDrop = this.$echarts.init(this.$refs.drop);
      var myError = this.$echarts.init(this.$refs.error);
      var myDiskpredetails = this.$echarts.init(this.$refs.diskpredetails);

      myBytes.setOption(this.option1);
      myDrop.setOption(this.option2);
      myError.setOption(this.option3);
      myDiskpredetails.setOption(this.option4);
      window.addEventListener('resize', function() {
        myBytes.resize();
        myDrop.resize();
        myError.resize();
        myDiskpredetails.resize();
      });
    },
    loadData() {
      for (var a in clusters) {
        this.timeNet.push(clusters[a].time);
        if (clusters[a].time === clusters[0].time) {
          this.clusterArr.push(clusters[a]);
        }
      }
      this.publicCluster();
    },
    limitDate() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(self.startdate).getTime() || time.getTime() > new Date(self.enddate).getTime();
        }
      };
    },
    // 集群公共
    publicCluster() {
      for (var c in clusters) {
        this.option1.xAxis.data.push(clusters[c].time);
        this.option1.series[0].data.push(clusters[c].mean_bytes_recv);
        this.option1.series[1].data.push(clusters[c].mean_bytes_sent);
        this.option2.xAxis.data.push(clusters[c].time);
        this.option2.series[0].data.push(clusters[c].mean_drop_in);
        this.option2.series[1].data.push(clusters[c].mean_drop_out);
        this.option3.xAxis.data.push(clusters[c].time);
        this.option3.series[0].data.push(clusters[c].mean_err_in);
        this.option3.series[1].data.push(clusters[c].mean_err_out);
        if (clusters[c].time === clusters[clusters.length - 1].time) {
          this.option4.series[0].data.push(clusters[c].mean_bytes_sent);
          this.option4.series[0].data.push(clusters[c].mean_drop_out);
          this.option4.series[0].data.push(clusters[c].mean_err_out);
          this.option4.series[1].data.push(clusters[c].mean_bytes_recv);
          this.option4.series[1].data.push(clusters[c].mean_drop_in);
          this.option4.series[1].data.push(clusters[c].mean_err_in);
        }
      }
    },
    publicReset() {
      this.option1.xAxis.data = [];
      this.option1.series[0].data = [];
      this.option1.series[1].data = [];
      this.option2.xAxis.data = [];
      this.option2.series[0].data = [];
      this.option2.series[1].data = [];
      this.option3.xAxis.data = [];
      this.option3.series[0].data = [];
      this.option3.series[1].data = [];
      this.option4.series[0].data = [];
      this.option4.series[1].data = [];
      this.value3 = [];
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeNet[this.timeNet.length - 1];
      this.option2.dataZoom[0].startValue = 0;
      this.option2.dataZoom[0].endValue = this.timeNet[this.timeNet.length - 1];
      this.option3.dataZoom[0].startValue = 0;
      this.option3.dataZoom[0].endValue = this.timeNet[this.timeNet.length - 1];
    },
    handlechangeCluster() {
      this.publicReset();
      this.nodeArr = [];
      this.value2 = -1;
      for (var a in nodes) {
        if (this.value1 === nodes[a].cluster_id && nodes[a].time === nodes[0].time) {
          this.nodeArr.push(nodes[a]);
        }
      }
      if (this.value1 === -1) {
        this.publicCluster();
      } else if (this.value1 !== -1) {
        this.publicCluster();
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
          this.publicCluster();
        } else if (this.value2 === nodes[a].node_id) {
          this.option1.xAxis.data.push(nodes[a].time);
          this.option1.series[0].data.push(nodes[a].mean_bytes_recv);
          this.option1.series[1].data.push(nodes[a].mean_bytes_sent);
          this.option2.xAxis.data.push(nodes[a].time);
          this.option2.series[0].data.push(nodes[a].mean_drop_in);
          this.option2.series[1].data.push(nodes[a].mean_drop_out);
          this.option3.xAxis.data.push(nodes[a].time);
          this.option3.series[0].data.push(nodes[a].mean_err_in);
          this.option3.series[1].data.push(nodes[a].mean_err_out);
          if (nodes[a].time === nodes[nodes.length - 1].time) {
            this.option4.series[0].data.push(nodes[a].mean_bytes_sent);
            this.option4.series[0].data.push(nodes[a].mean_drop_out);
            this.option4.series[0].data.push(nodes[a].mean_err_out);
            this.option4.series[1].data.push(nodes[a].mean_bytes_recv);
            this.option4.series[1].data.push(nodes[a].mean_drop_in);
            this.option4.series[1].data.push(nodes[a].mean_err_in);
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeTime() {
      var newStart = this.value3[0];
      var newEnd = this.value3[1];
      this.option4.series[0].data = [];
      this.option4.series[1].data = [];
      if (this.timeNet.indexOf(newStart) > -1 && this.timeNet.indexOf(newEnd) > -1) {
        var num1 = this.timeNet.indexOf(newStart);
        var num2 = this.timeNet.indexOf(newEnd);
        this.option1.dataZoom[0].startValue = num1;
        this.option1.dataZoom[0].endValue = num2;
        this.option2.dataZoom[0].startValue = num1;
        this.option2.dataZoom[0].endValue = num2;
        this.option3.dataZoom[0].startValue = num1;
        this.option3.dataZoom[0].endValue = num2;
      }
      for (var a in clusters) {
        if (this.value1 === -1) {
          if (clusters[a].time === newEnd) {
            this.option4.series[0].data.push(clusters[a].mean_bytes_sent);
            this.option4.series[0].data.push(clusters[a].mean_drop_out);
            this.option4.series[0].data.push(clusters[a].mean_err_out);
            this.option4.series[1].data.push(clusters[a].mean_bytes_recv);
            this.option4.series[1].data.push(clusters[a].mean_drop_in);
            this.option4.series[1].data.push(clusters[a].mean_err_in);
          }
        } else if (this.value1 === clusters[a].cluster_id) {
          if (clusters[a].time === newEnd) {
            this.option4.series[0].data.push(clusters[a].mean_bytes_sent);
            this.option4.series[0].data.push(clusters[a].mean_drop_out);
            this.option4.series[0].data.push(clusters[a].mean_err_out);
            this.option4.series[1].data.push(clusters[a].mean_bytes_recv);
            this.option4.series[1].data.push(clusters[a].mean_drop_in);
            this.option4.series[1].data.push(clusters[a].mean_err_in);
          }
          for (var b in nodes) {
            if (this.value2 === -1 && nodes[a].time === newEnd) {
              this.option4.series[0].data.push(nodes[b].mean_bytes_sent);
              this.option4.series[0].data.push(nodes[b].mean_drop_out);
              this.option4.series[0].data.push(nodes[b].mean_err_out);
              this.option4.series[1].data.push(nodes[b].mean_bytes_recv);
              this.option4.series[1].data.push(nodes[b].mean_drop_in);
              this.option4.series[1].data.push(nodes[b].mean_err_in);
            } else if (this.value2 === nodes[b].node_id && nodes[b].time === newEnd) {
              this.option4.series[0].data.push(nodes[b].mean_bytes_sent);
              this.option4.series[0].data.push(nodes[b].mean_drop_out);
              this.option4.series[0].data.push(nodes[b].mean_err_out);
              this.option4.series[1].data.push(nodes[b].mean_bytes_recv);
              this.option4.series[1].data.push(nodes[b].mean_drop_in);
              this.option4.series[1].data.push(nodes[b].mean_err_in);
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
