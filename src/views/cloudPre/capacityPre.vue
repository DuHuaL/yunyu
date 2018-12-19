<template>
  <div class="box">
    <el-row class="box-top">
      <span class="title">容量预测</span>
    </el-row>
    <div class="box-container">
      <el-card  class="card-search">
        <el-row :gutter="10">
          <h4>筛选查询</h4>
            <el-col :span="4">
              <el-select v-model="value1" @change="handleChangeCluster" placeholder="请选择">
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
              <el-select v-model="value2" @change="handleChangeNode" placeholder="请选择节点">
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
              <el-select v-model="value3" @change="handleChangeDisk" placeholder="请选择磁盘">
                <el-option :value="-1" label="全部磁盘"></el-option>
                <el-option
                  v-for="item2 in diskArr"
                  :key="item2.disk_id"
                  :label="item2.disk_name"
                  :value="item2.disk_id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-date-picker
                editable
                v-model="value4"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleChangeTime"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </el-col>
        </el-row>
      </el-card>
      <el-row class="box-footer" :gutter="15">
        <el-col :span="17">
          <el-card>
            <h4>容量趋势变化</h4>
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="容量趋势" name="first">
                <div ref="change" style="width: 1117px; height:464px;"></div>
              </el-tab-pane>
              <el-tab-pane label="增量详情" name="second">
                <div ref="increment" style="width:1117px; height: 464px;"></div>
              </el-tab-pane>
              <el-tab-pane label="详细数据表" name="third">
                <div>
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="rank"
                      label="排名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="cluster"
                      label="集群"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="node"
                      label="节点">
                    </el-table-column>
                    <el-table-column
                      prop="disk"
                      label="硬盘">
                    </el-table-column>
                    <el-table-column
                      prop="trend"
                      label="趋势">
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col :span="7">
            <el-card class="days">
              <div class="title">剩余可用天数</div>
              <div class="time">
                <span>{{ time }}</span>
              </div>
            </el-card>
            <el-card>
              <h4 class="details">容量详情图</h4>
              <div ref="details" style="width: 100%; height:420px;"></div>
            </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const clusters = [
  {
    time: '2018-12-05',
    cluster_name: 'clustertext',
    cluster_id: 1,
    disk_available_days: '4200',
    disk_total: '80000',
    disk_used: '7000',
    disk_used_percent: '0.075',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    cluster_name: 'clustertext',
    cluster_id: 1,
    disk_available_days: '4600',
    disk_total: '80000',
    disk_used: '8000',
    disk_used_percent: '0.075',
    disk_usage_level: 'low'

  },
  {
    time: '2018-12-07',
    cluster_name: 'clustertext',
    cluster_id: 1,
    disk_available_days: '3700',
    disk_total: '80000',
    disk_used: '8800',
    disk_used_percent: '0.075',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    cluster_name: 'clustertext',
    cluster_id: 1,
    disk_available_days: '4200',
    disk_total: '80000',
    disk_used: '7000',
    disk_used_percent: '0.075',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    cluster_name: 'clustertext',
    cluster_id: 1,
    disk_available_days: '4200',
    disk_total: '80000',
    disk_used: '6600',
    disk_used_percent: '0.075',
    disk_usage_level: 'low'
  }
];
const nodes = [
  {
    time: '2018-12-05',
    cluster_id: 1,
    node_id: 1,
    node_name: 'clustertext-node1',
    disk_available_days: '1800',
    disk_total: '30000',
    disk_used: '4000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_id: 1,
    node_name: 'clustertext-node1',
    disk_available_days: '1801',
    disk_total: '30000',
    disk_used: '5000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_id: 1,
    node_name: 'clustertext-node1',
    disk_available_days: '1500',
    disk_total: '30000',
    disk_used: '5000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_id: 1,
    node_name: 'clustertext-node1',
    disk_available_days: '2200',
    disk_total: '30000',
    disk_used: '3000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_id: 1,
    node_name: 'clustertext-node1',
    disk_available_days: '2500',
    disk_total: '30000',
    disk_used: '2000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-05',
    cluster_id: 1,
    node_id: 2,
    node_name: 'clustertext-node2',
    disk_available_days: '2400',
    disk_total: '50000',
    disk_used: '3000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    cluster_id: 1,
    node_id: 2,
    node_name: 'clustertext-node2',
    disk_available_days: '2600',
    disk_total: '50000',
    disk_used: '3000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-07',
    cluster_id: 1,
    node_id: 2,
    node_name: 'clustertext-node2',
    disk_available_days: '2200',
    disk_total: '50000',
    disk_used: '3800',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    cluster_id: 1,
    node_id: 2,
    node_name: 'clustertext-node2',
    disk_available_days: '2000',
    disk_total: '50000',
    disk_used: '4000',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    cluster_id: 1,
    node_id: 2,
    node_name: 'clustertext-node2',
    disk_available_days: '1700',
    disk_total: '50000',
    disk_used: '4600',
    disk_used_percent: '0.15',
    disk_usage_level: 'low'
  }
];
const disks = [
  {
    time: '2018-12-05',
    disk_name: 'node1-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '1000',
    disk_total: '10000',
    disk_used: '1000',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    disk_name: 'node1-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '800',
    disk_total: '10000',
    disk_used: '1500',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-07',
    disk_name: 'node1-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '900',
    disk_total: '10000',
    disk_used: '1200',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    disk_name: 'node1-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '1200',
    disk_total: '10000',
    disk_used: '800',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    disk_name: 'node1-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '1100',
    disk_total: '10000',
    disk_used: '900',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-05',
    disk_name: 'node1-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '800',
    disk_total: '20000',
    disk_used: '3000',
    disk_used_percent: '0.35',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    disk_name: 'node1-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '1001',
    disk_total: '20000',
    disk_used: '3500',
    disk_used_percent: '0.35',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-07',
    disk_name: 'node1-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '600',
    disk_total: '20000',
    disk_used: '3800',
    disk_used_percent: '0.35',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    disk_name: 'node1-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '1000',
    disk_total: '20000',
    disk_used: '2200',
    disk_used_percent: '0.35',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    disk_name: 'node1-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 1,
    disk_available_days: '1400',
    disk_total: '20000',
    disk_used: '1100',
    disk_used_percent: '0.35',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-05',
    disk_name: 'node2-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1000',
    disk_total: '20000',
    disk_used: '2000',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    disk_name: 'node2-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1400',
    disk_total: '20000',
    disk_used: '1500',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-07',
    disk_name: 'node2-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1200',
    disk_total: '20000',
    disk_used: '1800',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    disk_name: 'node2-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '900',
    disk_total: '20000',
    disk_used: '2200',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    disk_name: 'node2-disk1',
    disk_id: 1,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '800',
    disk_total: '20000',
    disk_used: '2400',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-05',
    disk_name: 'node2-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1400',
    disk_total: '30000',
    disk_used: '1000',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-06',
    disk_name: 'node2-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1200',
    disk_total: '30000',
    disk_used: '1500',
    disk_used_percent: '0.05',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-07',
    disk_name: 'node2-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1000',
    disk_total: '30000',
    disk_used: '2000',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-08',
    disk_name: 'node2-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '1100',
    disk_total: '30000',
    disk_used: '1800',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  },
  {
    time: '2018-12-09',
    disk_name: 'node2-disk2',
    disk_id: 2,
    cluster_id: 1,
    node_id: 2,
    disk_available_days: '900',
    disk_total: '30000',
    disk_used: '2200',
    disk_used_percent: '0.25',
    disk_usage_level: 'low'
  }
];
export default {
  data() {
    return {
      data: [],
      clusterArr: [],
      nodeArr: [],
      diskArr: [],
      value1: -1,
      value2: -1,
      value3: -1,
      value4: '',
      startdate: '2018-12-04',
      enddate: '2018-12-09',
      pickerOptions0: this.limitDate(),
      activeName: 'first',
      tableData: [],
      time: '',
      timeCap: [],
      option1: {
        title: {
          text: '容量趋势图'
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
          data: ['已用容量', '未用容量']
        },
        series: [
          {
            name: '已用容量',
            type: 'line',
            data: []
          },
          {
            name: '未用容量',
            type: 'line',
            data: []
          }
        ]
      },
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
          data: ['增量', '已用', '未用']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [
          {
            name: '增量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: []
          },
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
      },
      option3: {
        type: Object,
        title: {
          text: '总容量',
          x: 'center',
          y: 'center',
          subtext: '',
          subtextStyle: {
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: ['已用容量', '未用容量'],
          y: 'bottom',
          x: 'center'
        },
        series: [
          {
            name: '容量情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 0, name: '已用容量'},
              {value: 0, name: '未用容量'}
            ]
          }
        ],
        grid: {
          top: '0%'
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
      let mychange = this.$echarts.init(this.$refs.change);
      let mydetails = this.$echarts.init(this.$refs.details);
      let myincrement = this.$echarts.init(this.$refs.increment);
      mychange.setOption(this.option1);
      mydetails.setOption(this.option3);
      myincrement.setOption(this.option2);
      window.addEventListener('resize', function() {
        mychange.resize();
        mydetails.resize();
        myincrement.resize();
      });
    },
    loadData() {
      for (var c in clusters) {
        this.timeCap.push(clusters[c].time);
        if (clusters[c].time === clusters[0].time) {
          this.clusterArr.push(clusters[c]);
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
    // 集群公共数据
    publicCluster() {
      var data1 = [];
      for (var a in clusters) {
        this.option1.xAxis.data.push(clusters[a].time);
        this.option1.series[0].data.push(clusters[a].disk_used);
        this.option1.series[1].data.push(clusters[a].disk_total - clusters[a].disk_used);
        if (clusters[a].time === clusters[clusters.length - 1].time) {
          this.option3.series[0].data[0].value = (clusters[a].disk_used);
          this.option3.series[0].data[1].value = (clusters[a].disk_total - clusters[a].disk_used);
          this.option3.title.subtext = clusters[a].disk_total;
          this.time = clusters[a].disk_available_days;
          this.option2.yAxis.data.push(clusters[a].cluster_name);
          this.option2.series[1].data.push('-' + clusters[a].disk_used);
          this.option2.series[2].data.push(clusters[a].disk_total - clusters[a].disk_used);
        }
        if (clusters[a].time === clusters[0].time) {
          data1.push(clusters[a].disk_used);
        }
      }
      for (var i = 0; i < data1.length; i++) {
        this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[i]) - data1[i]);
      }
    },
    publicReset() {
      this.time = '';
      this.option2.yAxis.data = [];
      this.option2.series[0].data = [];
      this.option2.series[1].data = [];
      this.option2.series[2].data = [];
      this.option1.xAxis.data = [];
      this.option1.series[0].data = [];
      this.option1.series[1].data = [];
      this.option3.series[0].data[0].value = '';
      this.option3.series[0].data[1].value = '';
      this.option3.title.subtext = '';
      this.option1.dataZoom[0].startValue = 0;
      this.option1.dataZoom[0].endValue = this.timeCap[this.timeCap.length - 1];
      this.value4 = [];
    },
    handleChangeCluster() {
      this.publicReset();
      this.nodeArr = [];
      this.diskArr = [];
      var data1 = [];
      this.value2 = -1;
      this.value3 = -1;
      for (var a in nodes) {
        if (this.value1 === nodes[a].cluster_id && nodes[a].time === nodes[0].time) {
          this.nodeArr.push(nodes[a]);
        }
      }
      if (this.value1 === -1) {
        this.publicCluster();
      } else if (this.value1 !== -1) {
        for (var b in clusters) {
          if (this.value1 === clusters[b].cluster_id) {
            this.option1.xAxis.data.push(clusters[b].time);
            this.option1.series[0].data.push(clusters[b].disk_used);
            this.option1.series[1].data.push(clusters[b].disk_total - clusters[b].disk_used);
            if (clusters[b].time === clusters[clusters.length - 1].time) {
              this.option3.series[0].data[0].value = (clusters[b].disk_used);
              this.option3.series[0].data[1].value = (clusters[b].disk_total - clusters[b].disk_used);
              this.option3.title.subtext = clusters[b].disk_total;
              this.time = clusters[b].disk_available_days;
              for (var c in nodes) {
                if (nodes[c].time === nodes[nodes.length - 1].time) {
                  this.option2.yAxis.data.push(nodes[c].node_name);
                  this.option2.series[1].data.push('-' + nodes[c].disk_used);
                  this.option2.series[2].data.push(nodes[c].disk_total - nodes[c].disk_used);
                }
                if (nodes[c].time === nodes[0].time) {
                  data1.push(nodes[c].disk_used);
                }
              }
            }
          }
        }
        for (var i = 0; i < data1.length; i++) {
          this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[i]) - data1[i]);
        }
      }

      this.$nextTick(() => {
        this.init();
      });
    },
    handleChangeNode() {
      this.publicReset();
      this.diskArr = [];
      this.value3 = -1;
      var data1 = [];
      var data2 = [];
      for (var a in disks) {
        if (this.value2 === disks[a].node_id && disks[a].time === disks[0].time) {
          this.diskArr.push(disks[a]);
        }
      }
      if (this.value2 === -1) {
        for (var a in clusters) {
          if (this.value1 === clusters[a].cluster_id && this.value2 === -1) {
            this.option1.xAxis.data.push(clusters[a].time);
            this.option1.series[0].data.push(clusters[a].disk_used);
            this.option1.series[1].data.push(clusters[a].disk_total - clusters[a].disk_used);
            if (clusters[a].time === clusters[clusters.length - 1].time) {
              this.time = clusters[a].disk_available_days;
              this.option3.series[0].data[0].value = clusters[a].disk_used;
              this.option3.series[0].data[1].value = clusters[a].disk_total - clusters[a].disk_used;
              this.option3.title.subtext = clusters[a].disk_total;
              for (var b in nodes) {
                if (nodes[b].time === nodes[nodes.length - 1].time) {
                  this.option2.yAxis.data.push(nodes[b].node_name);
                  this.option2.series[1].data.push('-' + nodes[b].disk_used);
                  this.option2.series[2].data.push(nodes[b].disk_total - nodes[b].disk_used);
                }
                if (nodes[b].time === nodes[0].time) {
                  data1.push(nodes[b].disk_used);
                }
              }
              for (var i = 0; i < data1.length; i++) {
                this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[i]) - data1[i]);
              }
            }
          }
        }
      } else if (this.value2 !== -1) {
        for (var c in nodes) {
          if (this.value2 === nodes[c].node_id) {
            this.option1.xAxis.data.push(nodes[c].time);
            this.option1.series[0].data.push(nodes[c].disk_used);
            this.option1.series[1].data.push(nodes[c].disk_total - nodes[c].disk_used);
            if (nodes[c].time === nodes[nodes.length - 1].time) {
              this.time = nodes[c].disk_available_days;
              this.option3.series[0].data[0].value = nodes[c].disk_used;
              this.option3.series[0].data[1].value = nodes[c].disk_total - nodes[c].disk_used;
              this.option3.title.subtext = nodes[c].disk_total;
              // 增量变化
              for (var d in disks) {
                if (this.value2 === disks[d].node_id) {
                  if (disks[d].time === disks[disks.length - 1].time) {
                    this.option2.yAxis.data.push(disks[d].disk_name);
                    this.option2.series[1].data.push('-' + disks[d].disk_used);
                    this.option2.series[2].data.push(disks[d].disk_total - disks[d].disk_used);
                  }
                  if (disks[d].time === disks[0].time) {
                    data2.push(disks[d].disk_used);
                  }
                }
              }
              for (var j = 0; j < data2.length; j++) {
                this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[j]) - data2[j]);
              }
            }
          }
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handleChangeDisk() {
      this.publicReset();
      var data1 = [];
      for (var a in disks) {
        if (this.value3 === -1) {
          this.publicReset();
          for (var n in nodes) {
            if (this.value2 === nodes[n].node_id) {
              this.option1.xAxis.data.push(nodes[n].time);
              this.option1.series[0].data.push(nodes[n].disk_used);
              this.option1.series[1].data.push(nodes[n].disk_total - nodes[n].disk_used);
              if (nodes[n].time === nodes[nodes.length - 1].time) {
                this.option3.series[0].data[0].value = nodes[n].disk_used;
                this.option3.series[0].data[1].value = nodes[n].disk_total - nodes[n].disk_used;
                this.option3.title.subtext = nodes[n].disk_total;
                this.time = nodes[n].disk_available_days;
                for (var b in disks) {
                  if (this.value2 === disks[b].node_id) {
                    if (disks[b].time === disks[disks.length - 1].time) {
                      this.option2.yAxis.data.push(disks[b].disk_name);
                      this.option2.series[1].data.push('-' + disks[b].disk_used);
                      this.option2.series[2].data.push(disks[b].disk_total - disks[b].disk_used);
                    }
                    if (disks[b].time === disks[0].time) {
                      data1.push(disks[b].disk_used);
                    }
                  }
                }
              }
            }
          }
          for (var i = 0; i < data1.length; i++) {
            this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[i]) - data1[i]);
          }
        } else if (this.value2 === disks[a].node_id && this.value3 === disks[a].disk_id) {
          this.option1.xAxis.data.push(disks[a].time);
          this.option1.series[0].data.push(disks[a].disk_used);
          this.option1.series[1].data.push(disks[a].disk_total - disks[a].disk_used);
          if (disks[a].time === disks[disks.length - 1].time) {
            this.time = disks[a].disk_available_days;
            this.option3.series[0].data[0].value = disks[a].disk_used;
            this.option3.series[0].data[1].value = disks[a].disk_total - disks[a].disk_used;
            this.option3.title.subtext = disks[a].disk_total;
            this.option2.yAxis.data.push(disks[a].disk_name);
            this.option2.series[1].data.push('-' + disks[a].disk_used);
            this.option2.series[2].data.push(disks[a].disk_total - disks[a].disk_used);
          }
          if (disks[a].time === disks[0].time) {
            data1.push(disks[a].disk_used);
          }
        }
      }
      for (var i = 0; i < data1.length; i++) {
        this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[i]) - data1[i]);
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    handleChangeTime() {
      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];
      this.option2.series[0].data = [];
      this.option2.series[1].data = [];
      this.option2.series[2].data = [];
      var newStart = this.value4[0];
      var newEnd = this.value4[1];
      if (this.timeCap.indexOf(newStart) > -1 && this.timeCap.indexOf(newEnd) > -1) {
        var num1 = this.timeCap.indexOf(newStart);
        var num2 = this.timeCap.indexOf(newEnd);
        this.option1.dataZoom[0].startValue = num1;
        this.option1.dataZoom[0].endValue = num2;
      }
      // 第二个下拉框
      if (this.value1 === -1) {
        for (var a in clusters) {
          if (clusters[a].time === newEnd) {
            this.time = clusters[a].disk_available_days;
            this.option3.series[0].data[0].value = clusters[a].disk_used;
            this.option3.series[0].data[1].value = (clusters[a].disk_total - clusters[a].disk_used);
            this.option3.title.subtext = clusters[a].disk_total;
            this.option2.series[1].data.push('-' + clusters[a].disk_used);
            this.option2.series[2].data.push(clusters[a].disk_total - clusters[a].disk_used);
          }
          if (clusters[a].time === newStart) {
            data1.push(clusters[a].disk_used);
          }
        }
        for (var i = 0; i < data1.length; i++) {
          this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[i]) - data1[i]);
        }
      } else if (this.value1 !== -1) {
        this.option2.series[0].data = [];
        this.option2.series[1].data = [];
        this.option2.series[2].data = [];
        for (var a in clusters) {
          if (this.value1 === clusters[a].cluster_id) {
            if (clusters[a].time === newEnd) {
              this.time = clusters[a].disk_available_days;
              this.option3.series[0].data[0].value = clusters[a].disk_used;
              this.option3.series[0].data[1].value = (clusters[a].disk_total - clusters[a].disk_used);
              this.option3.title.subtext = clusters[a].disk_total;
              // 增量变化
              for (var b in nodes) {
                if (nodes[b].time === newEnd) {
                  this.option2.series[1].data.push('-' + nodes[b].disk_used);
                  this.option2.series[2].data.push(nodes[b].disk_total - nodes[b].disk_used);
                }
                if (nodes[b].time === newStart) {
                  data2.push(nodes[b].disk_used);
                }
              }
              for (var j = 0; j < data2.length; j++) {
                this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[j]) - data2[j]);
              }
            }
          }
        }
        if (this.value2 === -1) {
          this.option2.series[0].data = [];
          this.option2.series[1].data = [];
          this.option2.series[2].data = [];
          for (var a in clusters) {
            if (this.value1 === clusters[a].cluster_id && this.value2 === -1) {
              if (clusters[a].time === newEnd) {
                this.time = clusters[a].disk_available_days;
                this.option3.series[0].data[0].value = clusters[a].disk_used;
                this.option3.series[0].data[1].value = (clusters[a].disk_total - clusters[a].disk_used);
                this.option3.title.subtext = clusters[a].disk_total;
                // 增量变化
                for (var b in nodes) {
                  if (nodes[b].time === newEnd) {
                    this.option2.series[1].data.push('-' + nodes[b].disk_used);
                    this.option2.series[2].data.push(nodes[b].disk_total - nodes[b].disk_used);
                  }
                  if (nodes[b].time === newStart) {
                    data2.push(nodes[b].disk_used);
                  }
                }
                for (var j = 0; j < data2.length; j++) {
                  this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[j]) - data2[j]);
                }
              }
            }
          }
        } else if (this.value2 !== -1) {
          this.option2.series[0].data = [];
          this.option2.series[1].data = [];
          this.option2.series[2].data = [];
          for (var m in nodes) {
            if (this.value2 === nodes[m].node_id) {
              if (nodes[m].time === newEnd) {
                this.time = nodes[m].disk_available_days;
                this.option3.series[0].data[0].value = nodes[m].disk_used;
                this.option3.series[0].data[1].value = nodes[m].disk_total - nodes[m].disk_used;
                this.option3.title.subtext = nodes[m].disk_total;
                for (var d in disks) {
                  if (this.value2 === disks[d].node_id) {
                    if (disks[d].time === newEnd) {
                      this.option2.series[1].data.push('-' + disks[d].disk_used);
                      this.option2.series[2].data.push(disks[d].disk_total - disks[d].disk_used);
                    }
                    if (disks[d].time === newStart) {
                      data3.push(disks[d].disk_used);
                    }
                  }
                }
                for (var h = 0; h < data3.length; h++) {
                  this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[h]) - data3[h]);
                }
              }
            }
          }
          if (this.value3 === -1) {
            this.option2.series[0].data = [];
            this.option2.series[1].data = [];
            this.option2.series[2].data = [];
            for (var m in nodes) {
              if (this.value2 === nodes[m].node_id) {
                if (nodes[m].time === newEnd) {
                  this.time = nodes[m].disk_available_days;
                  this.option3.series[0].data[0].value = nodes[m].disk_used;
                  this.option3.series[0].data[1].value = nodes[m].disk_total - nodes[m].disk_used;
                  this.option3.title.subtext = nodes[m].disk_total;
                  for (var d in disks) {
                    if (this.value2 === disks[d].node_id) {
                      if (disks[d].time === newEnd) {
                        this.option2.series[1].data.push('-' + disks[d].disk_used);
                        this.option2.series[2].data.push(disks[d].disk_total - disks[d].disk_used);
                      }
                      if (disks[d].time === newStart) {
                        data3.push(disks[d].disk_used);
                      }
                    }
                  }
                  for (var h = 0; h < data3.length; h++) {
                    this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[h]) - data3[h]);
                  }
                }
              }
            }
          } else if (this.value3 !== -1) {
            this.option2.series[0].data = [];
            this.option2.series[1].data = [];
            this.option2.series[2].data = [];
            for (var y in disks) {
              if (this.value2 === disks[y].node_id && this.value3 === disks[y].disk_id) {
                if (disks[y].time === newEnd) {
                  this.time = disks[y].disk_available_days;
                  this.option3.series[0].data[0].value = disks[y].disk_used;
                  this.option3.series[0].data[1].value = disks[y].disk_total - disks[y].disk_used;
                  this.option3.title.subtext = disks[y].disk_total;
                  this.option2.series[1].data.push('-' + disks[y].disk_used);
                  this.option2.series[2].data.push(disks[y].disk_total - disks[y].disk_used);
                }
                if (disks[y].time === newStart) {
                  data4.push(disks[y].disk_used);
                }
              }
            }
            for (var s = 0; s < data4.length; s++) {
              this.option2.series[0].data.push(Math.abs(this.option2.series[1].data[s]) - data4[s]);
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
.box {
  height: 100%;
  width: 100%;
}
  .card-title {
    font-weight: 700;
  }
  .card-search {
    padding: 0;
    box-sizing: border-box;
  }
  .box-footer {
    padding-top: 20px;
  }
  .capDetails-desc {
    height: 60px;
    margin-bottom: 5px;
  }
  .days {
    margin-bottom: 10px;
    height: 110px;
    width: 100%;
  }
  .days .title {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 5px;
  }
  .days .time {
    width: 100%;
    height: 40px;
    /* margin-left: 40px; */
    text-align: center;
    font-size: 26px;
  }
  .details {
    margin-bottom: 0px;
  }
</style>
