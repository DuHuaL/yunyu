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
          <el-col :span="4">
            <el-select v-model="value3" @change="handlechangeDisk"  placeholder="请选择">
              <el-option :value="-1" label="全部磁盘"></el-option>
              <el-option
                v-for="item2 in diskArr"
                :key="item2.disk_id"
                :label="item2.disk_name"
                :value="item2.disk_id">
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
              <el-tab-pane label="I/O次数" name="first">
                <div ref="ionumber" style="width: 1117px; height: 464px"></div>
              </el-tab-pane>
              <el-tab-pane label="读/写速率趋势" name="second">
                <div ref="speed" style="width: 1117px; height: 464px;"></div>
                <!-- <speed-trend></speed-trend> -->
              </el-tab-pane>
              <el-tab-pane label="读/写量趋势" name="third">
                <!-- <amount-trend></amount-trend> -->
                <div ref="amount" style="width: 1117px; height: 464px;"></div>
              </el-tab-pane>
              <el-tab-pane label="读/写时间趋势" name="four">
                <!-- <time-trend></time-trend> -->
                <div ref="times" style="width: 1117px; height: 464px;"></div>
              </el-tab-pane>
              <el-tab-pane label="详细数据表" name="five">
                <!-- <details-table></details-table> -->
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
    mean_io: '3',
    mean_read_bytes: '340',
    mean_read_time: '0.375',
    mean_reads: '',
    mean_write_bytes: '115',
    mean_write_time: '0.35',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_io: '3',
    mean_read_bytes: '365',
    mean_read_time: '0.365',
    mean_reads: '',
    mean_write_bytes: '125',
    mean_write_time: '0.45',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_io: '3.25',
    mean_read_bytes: '390',
    mean_read_time: '0.5',
    mean_reads: '',
    mean_write_bytes: '130',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_io: '4.5',
    mean_read_bytes: '335',
    mean_read_time: '0.45',
    mean_reads: '',
    mean_write_bytes: '145',
    mean_write_time: '0.475',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    cluster_name: 'clustertext',
    cluster_id: 1,
    mean_io: '4',
    mean_read_bytes: '370',
    mean_read_time: '0.55',
    mean_reads: '',
    mean_write_bytes: '135',
    mean_write_time: '0.525',
    mean_writes: ''
  }
];
const nodes = [
  {
    time: '2018-12-06',
    node_name: 'node1',
    cluster_id: 1,
    node_id: 1,
    mean_io: '3.5',
    mean_read_bytes: '330',
    mean_read_time: '0.25',
    mean_reads: '',
    mean_write_bytes: '110',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    node_name: 'node1',
    cluster_id: 1,
    node_id: 1,
    mean_io: '2',
    mean_read_bytes: '330',
    mean_read_time: '0.28',
    mean_reads: '',
    mean_write_bytes: '110',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    node_name: 'node1',
    cluster_id: 1,
    node_id: 1,
    mean_io: '3.5',
    mean_read_bytes: '380',
    mean_read_time: '0.4',
    mean_reads: '',
    mean_write_bytes: '100',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    node_name: 'node1',
    cluster_id: 1,
    node_id: 1,
    mean_io: '5',
    mean_read_bytes: '290',
    mean_read_time: '0.25',
    mean_reads: '',
    mean_write_bytes: '150',
    mean_write_time: '0.45',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    node_name: 'node1',
    cluster_id: 1,
    node_id: 1,
    mean_io: '4',
    mean_read_bytes: '350',
    mean_read_time: '0.3',
    mean_reads: '',
    mean_write_bytes: '120',
    mean_write_time: '0.7',
    mean_writes: ''
  },
  {
    time: '2018-12-06',
    node_name: 'node2',
    cluster_id: 1,
    node_id: 2,
    mean_io: '2.5',
    mean_read_bytes: '350',
    mean_read_time: '0.5',
    mean_reads: '',
    mean_write_bytes: '120',
    mean_write_time: '0.3',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    node_name: 'node2',
    cluster_id: 1,
    node_id: 2,
    mean_io: '4',
    mean_read_bytes: '400',
    mean_read_time: '0.45',
    mean_reads: '',
    mean_write_bytes: '140',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    node_name: 'node2',
    cluster_id: 1,
    node_id: 2,
    mean_io: '3',
    mean_read_bytes: '400',
    mean_read_time: '0.6',
    mean_reads: '',
    mean_write_bytes: '160',
    mean_write_time: '0.6',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    node_name: 'node2',
    cluster_id: 1,
    node_id: 2,
    mean_io: '4',
    mean_read_bytes: '380',
    mean_read_time: '0.65',
    mean_reads: '',
    mean_write_bytes: '140',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    node_name: 'node2',
    cluster_id: 1,
    node_id: 2,
    mean_io: '4',
    mean_read_bytes: '390',
    mean_read_time: '0.8',
    mean_reads: '',
    mean_write_bytes: '150',
    mean_write_time: '0.35',
    mean_writes: ''
  }
];
const disks = [
  {
    time: '2018-12-06',
    disk_name: 'node1-disk1',
    cluster_id: 1,
    node_id: 1,
    disk_id: 1,
    mean_io: '4',
    mean_read_bytes: '320',
    mean_read_time: '0.2',
    mean_reads: '',
    mean_write_bytes: '100',
    mean_write_time: '0.3',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    disk_name: 'node1-disk1',
    cluster_id: 1,
    node_id: 1,
    disk_id: 1,
    mean_io: '2',
    mean_read_bytes: '360',
    mean_read_time: '0.3',
    mean_reads: '',
    mean_write_bytes: '120',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    disk_name: 'node1-disk1',
    cluster_id: 1,
    node_id: 1,
    disk_id: 1,
    mean_io: '3',
    mean_read_bytes: '400',
    mean_read_time: '0.5',
    mean_reads: '',
    mean_write_bytes: '80',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    disk_name: 'node1-disk1',
    cluster_id: 1,
    node_id: 1,
    disk_id: 1,
    mean_io: '2',
    mean_read_bytes: '300',
    mean_read_time: '0.25',
    mean_reads: '',
    mean_write_bytes: '160',
    mean_write_time: '0.2',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    disk_name: 'node1-disk1',
    cluster_id: 1,
    node_id: 1,
    disk_id: 1,
    mean_io: '4',
    mean_read_bytes: '380',
    mean_read_time: '0.4',
    mean_reads: '',
    mean_write_bytes: '110',
    mean_write_time: '0.6',
    mean_writes: ''
  },
  {
    time: '2018-12-06',
    disk_name: 'node1-disk2',
    cluster_id: 1,
    node_id: 1,
    disk_id: 2,
    mean_io: '3',
    mean_read_bytes: '340',
    mean_read_time: '0.3',
    mean_reads: '',
    mean_write_bytes: '120',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    disk_name: 'node1-disk2',
    cluster_id: 1,
    node_id: 1,
    disk_id: 2,
    mean_io: '2',
    mean_read_bytes: '300',
    mean_read_time: '0.26',
    mean_reads: '',
    mean_write_bytes: '100',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    disk_name: 'node1-disk2',
    cluster_id: 1,
    node_id: 1,
    disk_id: 2,
    mean_io: '4',
    mean_read_bytes: '360',
    mean_read_time: '0.3',
    mean_reads: '',
    mean_write_bytes: '120',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    disk_name: 'node1-disk2',
    cluster_id: 1,
    node_id: 1,
    disk_id: 2,
    mean_io: '6',
    mean_read_bytes: '280',
    mean_read_time: '0.25',
    mean_reads: '',
    mean_write_bytes: '140',
    mean_write_time: '0.7',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    disk_name: 'node1-disk2',
    cluster_id: 1,
    node_id: 1,
    disk_id: 2,
    mean_io: '4',
    mean_read_bytes: '320',
    mean_read_time: '0.2',
    mean_reads: '',
    mean_write_bytes: '130',
    mean_write_time: '0.8',
    mean_writes: ''
  },
  {
    time: '2018-12-06',
    disk_name: 'node2-disk1',
    cluster_id: 1,
    node_id: 2,
    disk_id: 1,
    mean_io: '3',
    mean_read_bytes: '400',
    mean_read_time: '0.4',
    mean_reads: '',
    mean_write_bytes: '140',
    mean_write_time: '0.2',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    disk_name: 'node2-disk1',
    cluster_id: 1,
    node_id: 2,
    disk_id: 1,
    mean_io: '1',
    mean_read_bytes: '420',
    mean_read_time: '0.5',
    mean_reads: '',
    mean_write_bytes: '160',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    disk_name: 'node2-disk1',
    cluster_id: 1,
    node_id: 2,
    disk_id: 1,
    mean_io: '4',
    mean_read_bytes: '460',
    mean_read_time: '0.7',
    mean_reads: '',
    mean_write_bytes: '180',
    mean_write_time: '0.7',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    disk_name: 'node2-disk1',
    cluster_id: 1,
    node_id: 2,
    disk_id: 1,
    mean_io: '6',
    mean_read_bytes: '440',
    mean_read_time: '0.6',
    mean_reads: '',
    mean_write_bytes: '150',
    mean_write_time: '0.6',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    disk_name: 'node2-disk1',
    cluster_id: 1,
    node_id: 2,
    disk_id: 1,
    mean_io: '5',
    mean_read_bytes: '450',
    mean_read_time: '0.8',
    mean_reads: '',
    mean_write_bytes: '170',
    mean_write_time: '0.3',
    mean_writes: ''
  },
  {
    time: '2018-12-06',
    disk_name: 'node2-disk2',
    cluster_id: 1,
    node_id: 2,
    disk_id: 2,
    mean_io: '2',
    mean_read_bytes: '300',
    mean_read_time: '0.6',
    mean_reads: '',
    mean_write_bytes: '100',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-07',
    disk_name: 'node2-disk2',
    cluster_id: 1,
    node_id: 2,
    disk_id: 2,
    mean_io: '7',
    mean_read_bytes: '380',
    mean_read_time: '0.4',
    mean_reads: '',
    mean_write_bytes: '100',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-08',
    disk_name: 'node2-disk2',
    cluster_id: 1,
    node_id: 2,
    disk_id: 2,
    mean_io: '2',
    mean_read_bytes: '340',
    mean_read_time: '0.5',
    mean_reads: '',
    mean_write_bytes: '140',
    mean_write_time: '0.5',
    mean_writes: ''
  },
  {
    time: '2018-12-09',
    disk_name: 'node2-disk2',
    cluster_id: 1,
    node_id: 2,
    disk_id: 2,
    mean_io: '2',
    mean_read_bytes: '320',
    mean_read_time: '0.7',
    mean_reads: '',
    mean_write_bytes: '130',
    mean_write_time: '0.4',
    mean_writes: ''
  },
  {
    time: '2018-12-10',
    disk_name: 'node2-disk2',
    cluster_id: 1,
    node_id: 2,
    disk_id: 2,
    mean_io: '3',
    mean_read_bytes: '330',
    mean_read_time: '0.8',
    mean_reads: '',
    mean_write_bytes: '130',
    mean_write_time: '0.4',
    mean_writes: ''
  }
];
export default {
  name: 'DiskPre',
  data() {
    return {
      activeName: 'first',
      clusterArr: [],
      nodeArr: [],
      diskArr: [],
      value1: -1,
      value2: -1,
      value3: -1,
      value4: '',
      startdate: '2018-12-05',
      enddate: '2018-12-10',
      pickerOptions0: this.limitDate(),
      timeDisk: [],
      option0: {
        title: {
          text: 'I/O次数'
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
          data: ['IO次数']
        },
        series: [
          {
            name: 'IO次数',
            type: 'line',
            data: []
          }
        ]
      },
      option1: {
        title: {
          text: '读/写速率趋势图'
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
          data: ['读速率', '写速率']
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
            name: '读速率',
            type: 'line',
            data: []
          },
          {
            name: '写速率',
            type: 'line',
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: '读写量趋势图'
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
          data: ['读取量', '写入量']
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
            name: '读取量',
            type: 'line',
            data: []
          },
          {
            name: '写入量',
            type: 'line',
            data: []
          }
        ]
      },
      option3: {
        title: {
          text: '读/写时间趋势图'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
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
            name: '读时间',
            type: 'line',
            data: []
          },
          {
            name: '写时间',
            type: 'line',
            data: []
          }
        ],
        legend: {
          data: ['读时间', '写时间']
        }
      },
      option4: {
        title: {
          text: '硬盘预测详情'
        },
        parallelAxis: [
          {dim: 0, name: 'I/O次数'},
          {dim: 1, name: '读速率'},
          {dim: 2, name: '读时间'},
          {dim: 3, name: '读量'},
          {dim: 4, name: '写速率'},
          {dim: 5, name: '写时间'},
          {dim: 6, name: '写量'}
        ],
        legend: {
          data: [
            {
              name: '原始值',
              icon: 'rect'
            },
            {
              name: '预测值',
              icon: 'rect'
            }
          ],
          y: 'bottom'
        },
        series: [
          {
            name: '原始值',
            type: 'parallel',
            lineStyle: {
              width: 1,
              opacity: 0.9
            },
            data: [
              []
            ]
          },
          {
            name: '预测值',
            type: 'parallel',
            data: [
              []
            ]
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
      var myIoNumber = this.$echarts.init(this.$refs.ionumber);
      var myspeed = this.$echarts.init(this.$refs.speed);
      var myamount = this.$echarts.init(this.$refs.amount);
      var mytimes = this.$echarts.init(this.$refs.times);
      var mydiskpreDetails = this.$echarts.init(this.$refs.diskpredetails);
      myIoNumber.setOption(this.option0);
      myspeed.setOption(this.option1);
      myamount.setOption(this.option2);
      mytimes.setOption(this.option3);
      mydiskpreDetails.setOption(this.option4);
      window.addEventListener('resize', function() {
        myIoNumber.resize();
        myspeed.resize();
        myamount.resize();
        mytimes.resize();
        mydiskpreDetails.resize();
      });
    },
    loadData() {
      for (var a in clusters) {
        this.timeDisk.push(clusters[a].time);
        if (clusters[a].time === clusters[0].time) {
          this.clusterArr.push(clusters[a]);
        }
      }
      this.publicLoad();
    },
    limitDate() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(self.startdate).getTime() || time.getTime() > new Date(self.enddate).getTime();
        }
      };
    },
    publicLoad() {
      for (var a in clusters) {
        if (clusters[a].time === clusters[clusters.length - 1].time) {
          this.option4.series[1].data[0].push(clusters[a].mean_io);
          this.option4.series[1].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
          this.option4.series[1].data[0].push(clusters[a].mean_read_time);
          this.option4.series[1].data[0].push(clusters[a].mean_read_bytes);
          this.option4.series[1].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
          this.option4.series[1].data[0].push(clusters[a].mean_write_time);
          this.option4.series[1].data[0].push(clusters[a].mean_write_bytes);
        }
        if (clusters[a].time === clusters[0].time) {
          this.option4.series[0].data[0].push(clusters[a].mean_io);
          this.option4.series[0].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
          this.option4.series[0].data[0].push(clusters[a].mean_read_time);
          this.option4.series[0].data[0].push(clusters[a].mean_read_bytes);
          this.option4.series[0].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
          this.option4.series[0].data[0].push(clusters[a].mean_write_time);
          this.option4.series[0].data[0].push(clusters[a].mean_write_bytes);
        }
        this.option0.xAxis.data.push(clusters[a].time);
        this.option0.series[0].data.push(clusters[a].mean_io);
        this.option1.xAxis.data.push(clusters[a].time);
        this.option1.series[0].data.push((clusters[a].mean_read_bytes / clusters[a].mean_read_time).toFixed(2));
        this.option1.series[1].data.push((clusters[a].mean_write_bytes / clusters[a].mean_write_time).toFixed(2));
        this.option2.xAxis.data.push(clusters[a].time);
        this.option2.series[0].data.push(clusters[a].mean_read_bytes);
        this.option2.series[1].data.push(clusters[a].mean_write_bytes);
        this.option3.xAxis.data.push(clusters[a].time);
        this.option3.series[0].data.push(clusters[a].mean_read_time);
        this.option3.series[1].data.push(clusters[a].mean_write_time);
      }
    },
    handlechangeCluster() {
      this.publicReset();
      this.publicTime();
      this.nodeArr = [];
      this.diskArr = [];
      this.value2 = -1;
      this.value3 = -1;
      for (var a in nodes) {
        if (this.value1 === nodes[a].cluster_id && nodes[a].time === nodes[nodes.length - 1].time) {
          this.nodeArr.push(nodes[a]);
        }
      }
      if (this.value1 === -1) {
        this.publicLoad();
      } else if (this.value1 !== -1) {
        this.publicLoad();
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    publicReset() {
      this.option0.xAxis.data = [];
      this.option0.series[0].data = [];
      this.option1.xAxis.data = [];
      this.option1.series[0].data = [];
      this.option1.series[1].data = [];
      this.option2.xAxis.data = [];
      this.option2.series[0].data = [];
      this.option2.series[1].data = [];
      this.option3.xAxis.data = [];
      this.option3.series[0].data = [];
      this.option3.series[1].data = [];
      this.option4.series[0].data[0] = [];
      this.option4.series[1].data[0] = [];
      this.value4 = [];
    },
    handlechangeNode() {
      this.publicReset();
      this.publicTime();
      this.diskArr = [];
      this.value3 = -1;
      // 点击节点下拉框，获取磁盘下拉框里的内容
      for (var a in disks) {
        if (this.value2 === disks[a].node_id && disks[a].time === disks[disks.length - 1].time) {
          this.diskArr.push(disks[a]);
        }
      }
      if (this.value2 === -1) {
        this.publicLoad();
      } else if (this.value2 !== -1) {
        // this.publicReset();
        for (var b in nodes) {
          if (this.value2 === nodes[b].node_id) {
            this.option0.xAxis.data.push(nodes[b].time);
            this.option0.series[0].data.push(nodes[b].mean_io);
            this.option1.xAxis.data.push(nodes[b].time);
            this.option1.series[0].data.push((nodes[b].mean_read_bytes / nodes[b].mean_read_time).toFixed(2));
            this.option1.series[1].data.push((nodes[b].mean_write_bytes / nodes[b].mean_write_time).toFixed(2));
            this.option2.xAxis.data.push(nodes[b].time);
            this.option2.series[0].data.push(nodes[b].mean_read_bytes);
            this.option2.series[1].data.push(nodes[b].mean_write_bytes);
            this.option3.xAxis.data.push(nodes[b].time);
            this.option3.series[0].data.push(nodes[b].mean_read_time);
            this.option3.series[1].data.push(nodes[b].mean_write_time);
            if (nodes[b].time === nodes[nodes.length - 1].time) {
              this.option4.series[1].data[0].push(nodes[b].mean_io);
              this.option4.series[1].data[0].push(nodes[b].mean_read_bytes / nodes[b].mean_read_time);
              this.option4.series[1].data[0].push(nodes[b].mean_read_time);
              this.option4.series[1].data[0].push(nodes[b].mean_read_bytes);
              this.option4.series[1].data[0].push(nodes[b].mean_write_bytes / nodes[b].mean_write_time);
              this.option4.series[1].data[0].push(nodes[b].mean_write_time);
              this.option4.series[1].data[0].push(nodes[b].mean_write_bytes);
            }
            if (nodes[b].time === nodes[0].time) {
              this.option4.series[0].data[0].push(nodes[b].mean_io);
              this.option4.series[0].data[0].push(nodes[b].mean_read_bytes / nodes[b].mean_read_time);
              this.option4.series[0].data[0].push(nodes[b].mean_read_time);
              this.option4.series[0].data[0].push(nodes[b].mean_read_bytes);
              this.option4.series[0].data[0].push(nodes[b].mean_write_bytes / nodes[b].mean_write_time);
              this.option4.series[0].data[0].push(nodes[b].mean_write_time);
              this.option4.series[0].data[0].push(nodes[b].mean_write_bytes);
            }
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handlechangeDisk() {
      this.publicReset();
      this.publicTime();
      for (var a in disks) {
        if (this.value3 === -1) {
          this.publicReset();
          for (var b in nodes) {
            if (this.value2 === nodes[b].node_id) {
              this.option0.xAxis.data.push(nodes[b].time);
              this.option0.series[0].data.push(nodes[b].mean_io);
              this.option1.xAxis.data.push(nodes[b].time);
              this.option1.series[0].data.push((nodes[b].mean_read_bytes / nodes[b].mean_read_time).toFixed(2));
              this.option1.series[1].data.push((nodes[b].mean_write_bytes / nodes[b].mean_write_time).toFixed(2));
              this.option2.xAxis.data.push(nodes[b].time);
              this.option2.series[0].data.push(nodes[b].mean_read_bytes);
              this.option2.series[1].data.push(nodes[b].mean_write_bytes);
              this.option3.xAxis.data.push(nodes[b].time);
              this.option3.series[0].data.push(nodes[b].mean_read_time);
              this.option3.series[1].data.push(nodes[b].mean_write_time);
              if (nodes[b].time === nodes[nodes.length - 1].time) {
                this.option4.series[1].data[0].push(nodes[b].mean_io);
                this.option4.series[1].data[0].push(nodes[b].mean_read_bytes / nodes[b].mean_read_time);
                this.option4.series[1].data[0].push(nodes[b].mean_read_time);
                this.option4.series[1].data[0].push(nodes[b].mean_read_bytes);
                this.option4.series[1].data[0].push(nodes[b].mean_write_bytes / nodes[b].mean_write_time);
                this.option4.series[1].data[0].push(nodes[b].mean_write_time);
                this.option4.series[1].data[0].push(nodes[b].mean_write_bytes);
              }
              if (nodes[b].time === nodes[0].time) {
                this.option4.series[0].data[0].push(nodes[b].mean_io);
                this.option4.series[0].data[0].push(nodes[b].mean_read_bytes / nodes[b].mean_read_time);
                this.option4.series[0].data[0].push(nodes[b].mean_read_time);
                this.option4.series[0].data[0].push(nodes[b].mean_read_bytes);
                this.option4.series[0].data[0].push(nodes[b].mean_write_bytes / nodes[b].mean_write_time);
                this.option4.series[0].data[0].push(nodes[b].mean_write_time);
                this.option4.series[0].data[0].push(nodes[b].mean_write_bytes);
              }
            }
          }
        } else if (this.value2 === disks[a].node_id && this.value3 === disks[a].disk_id) {
          this.option0.xAxis.data.push(disks[a].time);
          this.option0.series[0].data.push(disks[a].mean_io);
          this.option1.xAxis.data.push(disks[a].time);
          this.option1.series[0].data.push((disks[a].mean_read_bytes / disks[a].mean_read_time).toFixed(2));
          this.option1.series[1].data.push((disks[a].mean_write_bytes / disks[a].mean_write_time).toFixed(2));
          this.option2.xAxis.data.push(disks[a].time);
          this.option2.series[0].data.push(disks[a].mean_read_bytes);
          this.option2.series[1].data.push(disks[a].mean_write_bytes);
          this.option3.xAxis.data.push(disks[a].time);
          this.option3.series[0].data.push(disks[a].mean_read_time);
          this.option3.series[1].data.push(disks[a].mean_write_time);
          if (disks[a].time === disks[0].time) {
            this.option4.series[0].data[0].push(disks[a].mean_io);
            this.option4.series[0].data[0].push(disks[a].mean_read_bytes / disks[a].mean_read_time);
            this.option4.series[0].data[0].push(disks[a].mean_read_time);
            this.option4.series[0].data[0].push(disks[a].mean_read_bytes);
            this.option4.series[0].data[0].push(disks[a].mean_write_bytes / disks[a].mean_write_time);
            this.option4.series[0].data[0].push(disks[a].mean_write_time);
            this.option4.series[0].data[0].push(disks[a].mean_write_bytes);
          }
          if (disks[a].time === disks[disks.length - 1].time) {
            this.option4.series[1].data[0].push(disks[a].mean_io);
            this.option4.series[1].data[0].push(disks[a].mean_read_bytes / disks[a].mean_read_time);
            this.option4.series[1].data[0].push(disks[a].mean_read_time);
            this.option4.series[1].data[0].push(disks[a].mean_read_bytes);
            this.option4.series[1].data[0].push(disks[a].mean_write_bytes / disks[a].mean_write_time);
            this.option4.series[1].data[0].push(disks[a].mean_write_time);
            this.option4.series[1].data[0].push(disks[a].mean_write_bytes);
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    publicTime() {
      this.option0.dataZoom[0].startValue = 0;
      this.option0.dataZoom[0].endValue = this.timeDisk[this.timeDisk.length - 1];
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeDisk[this.timeDisk.length - 1];
      this.option2.dataZoom[0].startValue = 0;
      this.option2.dataZoom[0].endValue = this.timeDisk[this.timeDisk.length - 1];
      this.option3.dataZoom[0].startValue = 0;
      this.option3.dataZoom[0].endValue = this.timeDisk[this.timeDisk.length - 1];
    },
    handlechangeTime() {
      this.option4.series[0].data[0] = [];
      this.option4.series[1].data[0] = [];
      var newStart = this.value4[0];
      var newEnd = this.value4[1];
      if (this.timeDisk.indexOf(newStart) > -1 && this.timeDisk.indexOf(newEnd) > -1) {
        var num1 = this.timeDisk.indexOf(newStart);
        var num2 = this.timeDisk.indexOf(newEnd);
        this.option0.dataZoom[0].startValue = num1;
        this.option0.dataZoom[0].endValue = num2;
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
            this.option4.series[1].data[0].push(clusters[a].mean_io);
            this.option4.series[1].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
            this.option4.series[1].data[0].push(clusters[a].mean_read_time);
            this.option4.series[1].data[0].push(clusters[a].mean_read_bytes);
            this.option4.series[1].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
            this.option4.series[1].data[0].push(clusters[a].mean_write_time);
            this.option4.series[1].data[0].push(clusters[a].mean_write_bytes);
          }
          if (clusters[a].time === newStart) {
            this.option4.series[0].data[0].push(clusters[a].mean_io);
            this.option4.series[0].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
            this.option4.series[0].data[0].push(clusters[a].mean_read_time);
            this.option4.series[0].data[0].push(clusters[a].mean_read_bytes);
            this.option4.series[0].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
            this.option4.series[0].data[0].push(clusters[a].mean_write_time);
            this.option4.series[0].data[0].push(clusters[a].mean_write_bytes);
          }
        } else if (this.value1 !== -1) {
          if (this.value1 === clusters[a].cluster_id) {
            if (clusters[a].time === newStart) {
              this.option4.series[0].data[0].push(clusters[a].mean_io);
              this.option4.series[0].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
              this.option4.series[0].data[0].push(clusters[a].mean_read_time);
              this.option4.series[0].data[0].push(clusters[a].mean_read_bytes);
              this.option4.series[0].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
              this.option4.series[0].data[0].push(clusters[a].mean_write_time);
              this.option4.series[0].data[0].push(clusters[a].mean_write_bytes);
            }
            if (clusters[a].time === newEnd) {
              this.option4.series[1].data[0].push(clusters[a].mean_io);
              this.option4.series[1].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
              this.option4.series[1].data[0].push(clusters[a].mean_read_time);
              this.option4.series[1].data[0].push(clusters[a].mean_read_bytes);
              this.option4.series[1].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
              this.option4.series[1].data[0].push(clusters[a].mean_write_time);
              this.option4.series[1].data[0].push(clusters[a].mean_write_bytes);
            }
            for (var b in nodes) {
              if (this.value2 === -1) {
                if (clusters[a].time === newStart) {
                  this.option4.series[0].data[0].push(clusters[a].mean_io);
                  this.option4.series[0].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
                  this.option4.series[0].data[0].push(clusters[a].mean_read_time);
                  this.option4.series[0].data[0].push(clusters[a].mean_read_bytes);
                  this.option4.series[0].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
                  this.option4.series[0].data[0].push(clusters[a].mean_write_time);
                  this.option4.series[0].data[0].push(clusters[a].mean_write_bytes);
                }
                if (clusters[a].time === newEnd) {
                  this.option4.series[1].data[0].push(clusters[a].mean_io);
                  this.option4.series[1].data[0].push(clusters[a].mean_read_bytes / clusters[a].mean_read_time);
                  this.option4.series[1].data[0].push(clusters[a].mean_read_time);
                  this.option4.series[1].data[0].push(clusters[a].mean_read_bytes);
                  this.option4.series[1].data[0].push(clusters[a].mean_write_bytes / clusters[a].mean_write_time);
                  this.option4.series[1].data[0].push(clusters[a].mean_write_time);
                  this.option4.series[1].data[0].push(clusters[a].mean_write_bytes);
                }
              } else if (this.value2 !== -1) {
                if (this.value2 === nodes[b].node_id) {
                  if (nodes[b].time === newStart) {
                    this.option4.series[0].data[0].push(nodes[b].mean_io);
                    this.option4.series[0].data[0].push(nodes[b].mean_read_bytes / nodes[b].mean_read_time);
                    this.option4.series[0].data[0].push(nodes[b].mean_read_time);
                    this.option4.series[0].data[0].push(nodes[b].mean_read_bytes);
                    this.option4.series[0].data[0].push(nodes[b].mean_write_bytes / nodes[b].mean_write_time);
                    this.option4.series[0].data[0].push(nodes[b].mean_write_time);
                    this.option4.series[0].data[0].push(nodes[b].mean_write_bytes);
                  }
                  if (nodes[b].time === newEnd) {
                    this.option4.series[1].data[0].push(nodes[b].mean_io);
                    this.option4.series[1].data[0].push(nodes[b].mean_read_bytes / nodes[b].mean_read_time);
                    this.option4.series[1].data[0].push(nodes[b].mean_read_time);
                    this.option4.series[1].data[0].push(nodes[b].mean_read_bytes);
                    this.option4.series[1].data[0].push(nodes[b].mean_write_bytes / nodes[b].mean_write_time);
                    this.option4.series[1].data[0].push(nodes[b].mean_write_time);
                    this.option4.series[1].data[0].push(nodes[b].mean_write_bytes);
                  }
                  for (var c in disks) {
                    if (this.value3 === disks[c].disk_id) {
                      if (disks[c].time === newStart) {
                        this.option4.series[0].data[0].push(disks[c].mean_io);
                        this.option4.series[0].data[0].push(disks[c].mean_read_bytes / disks[c].mean_read_time);
                        this.option4.series[0].data[0].push(disks[c].mean_read_time);
                        this.option4.series[0].data[0].push(disks[c].mean_read_bytes);
                        this.option4.series[0].data[0].push(disks[c].mean_write_bytes / disks[c].mean_write_time);
                        this.option4.series[0].data[0].push(disks[c].mean_write_time);
                        this.option4.series[0].data[0].push(disks[c].mean_write_bytes);
                      }
                      if (disks[c].time === newEnd) {
                        this.option4.series[1].data[0].push(disks[c].mean_io);
                        this.option4.series[1].data[0].push(disks[c].mean_read_bytes / disks[c].mean_read_time);
                        this.option4.series[1].data[0].push(disks[c].mean_read_time);
                        this.option4.series[1].data[0].push(disks[c].mean_read_bytes);
                        this.option4.series[1].data[0].push(disks[c].mean_write_bytes / disks[c].mean_write_time);
                        this.option4.series[1].data[0].push(disks[c].mean_write_time);
                        this.option4.series[1].data[0].push(disks[c].mean_write_bytes);
                      }
                    }
                  }
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
