<template>
  <div class="box">
    <el-row class="box-top">
      <span class="title">系统设置</span>
    </el-row>
    <div class="box-container">
      <el-card class="card">
        <el-form :model="form" class="form">
          <el-form-item label="学习精度" :label-width="formLabelWidth" class="el-form-item">
            <el-radio-group v-model="form.value1" :disabled="isdisabled">
              <el-radio :label="3">很高</el-radio>
              <el-radio :label="6">普通</el-radio>
              <el-radio :label="9">较低</el-radio>
            </el-radio-group>
            <p class="tips">学习精度越高,获取数据越精准,学习周期越长</p>
          </el-form-item>
          <el-form-item label="立即学习" :label-width="formLabelWidth" class="el-form-item" >
            <el-switch
              :disabled="isdisabled"
              v-model="form.value2"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
            <p class="tips">立即启用机器学习</p>
          </el-form-item>
          <el-form-item label="开启预警提示" :label-width="formLabelWidth" class="el-form-item">
            <el-switch
              :disabled="isdisabled"
              v-model="form.value3"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
            <p class="tips">在学习出特殊数据时，给予用户提示窗，便于查询数据详情</p>
          </el-form-item>
          <el-form-item label="预警策略配置" :label-width="formLabelWidth" class="el-form-item">
            <el-row :span="24" class="rowline">
            <el-col :span="8" class="boxcol">
              <span class="demonstration">已用容量</span>
              <el-slider v-model="form.value6"  :format-tooltip="formatTooltip" class="bar"
              :disabled="isdisabled"></el-slider>
            </el-col>
            <el-col :span="8" class="boxcol">
              <span class="demonstration">cpu使用率</span>
              <el-slider v-model="form.value7"  :format-tooltip="formatTooltip" class="bar"
              :disabled="isdisabled"></el-slider>
            </el-col>
            <el-col :span="8" class="boxcol">
              <span class="demonstration">内存使用率</span>
              <el-slider v-model="form.value8"  :format-tooltip="formatTooltip" class="bar"
              :disabled="isdisabled"></el-slider>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="boxcol">
              <span class="demonstration">系统负载</span>
              <el-slider v-model="form.value9"  :format-tooltip="formatTooltip" class="bar"
              :disabled="isdisabled"></el-slider>
              </el-col>
            </el-row>
            <el-row :span="24">
            <p class="tips">设置相应选项的阀值即可触发界面预警提示信息</p>
            </el-row>
          </el-form-item>
          <el-form-item label="高性能模式" :label-width="formLabelWidth" class="el-form-item">
            <el-switch
            :disabled="isdisabled"
              v-model="form.value4"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
            <p class="tips">开启后将占用较高性能资源用于机器学习( 建议默认关闭 )</p>
          </el-form-item>
          <el-form-item label="待机模式" :label-width="formLabelWidth" class="el-form-item">
            <el-switch
              @change="handleswitch(form.value5)"
              v-model="form.value5"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-col :span="11">
            &nbsp;
          </el-col>
          <el-col  :span="13">
            <el-button >&nbsp;&nbsp;取  消&nbsp;&nbsp;</el-button>
            <el-button   type="primary" @click="handlechangeFormVisible">保存配置</el-button>
          </el-col>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
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
const sys = [
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
  data() {
    return {
      form: {
        value1: 6,
        value2: true,
        value3: false,
        value4: true,
        value5: false,
        value6: 20,
        value7: 19,
        value8: 10,
        value9: 20,
      },
      formLabelWidth: '120px',
      isdisabled: false

    };
  },
  methods: {
    handlechangeFormVisible() {
      var dataDisk = [];
      var gtValue = [];
      // 已用容量
      for (var a in disks) {
        if (disks[a].time === disks[0].time) {
          dataDisk.push(disks[a]);
        }
      }
      for (var b in dataDisk) {
        if (((dataDisk[b].disk_used / dataDisk[b].disk_total)* 100) >= this.form.value6) {
          this.$message.warning('已用容量超过'+ (this.form.value6) + '%');
        }
      }
      // cpu 使用率
      var dataCpu = [];
      for (var c in cpus) {
        if (cpus[c].time === cpus[0].time) {
          dataCpu.pus
        }
      }
      for (var d in dataCpu) {
        if ((dataCpu[d].mean_usage_system + dataCpu[d].mean_usage_user) >= this.form.value7) {
          console.log('aa');
          this.$message.warning('当前cpu使用超过'+ (this.form.value7) + '%');
        }
      }
    },
    formatTooltip(val) {
      return val + '%';
    },
    handleswitch(val) {
      if (val) {
        this.form.value2 = false;
        this.form.value3 = false;
        this.form.value4 = false;
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    }
  }
};
</script>

<style scoped>
  .footer {
    padding-top: 50px;
  }
  .card {
    height: 745px;
    padding: 0px 50px;
    width: 100%;
    box-sizing: border-box;
  }
  .el-form-item {
    margin: 0px;
    padding: 0px;
    padding-left: 20px;
    width: 100%;
  }
  .tips {
    margin-top: 0px;
  }
  .bar {
    width: 220px;
    float: right;
    padding-right: 150px;
  }
  .boxcol {
    box-sizing: border-box;
  }
</style>
