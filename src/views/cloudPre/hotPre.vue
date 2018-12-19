<template>
  <div class="box">
    <el-row class="box-top">
        <span class="title">热点预测</span>
    </el-row>
    <div class="box-container">
      <el-row :gutter="20" class="echarts-box">
        <el-col :span="7">
          <el-row class="warning">
            <el-card class="box-hot">
              <el-col :span="4">热度展示</el-col>
              <div id="meter-hot">
                <canvas id="meter" width="360" height="224"></canvas>
              </div>
              <h4>预警：<span>热点CPU<b>{{ num1 }}</b>个 热点硬盘<b>{{ num2 }}</b>个。</span></h4>
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <contrast></contrast>
            </el-card>
          </el-row>
        </el-col>
        <el-col :span="17">
          <el-row class="show">
            <el-card>
              <el-row>
                <el-col :span="20">磁盘热度</el-col>
                <el-col :span="4">
                  <el-select v-model="value1" @change="handlechangeNode" placeholder="请选择">
                    <el-option label="请选择节点" :value="-1"></el-option>
                    <el-option
                      v-for="item in nodeArr"
                      :key="item.node_id"
                      :label="item.node_name"
                      :value="item.node_id"
                      >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <!-- <show></show> -->
              <div>主机IP: {{ ip }}</div>
              <div ref="show" style="width: 100%;height:260px;"></div>
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <h4>热点时段</h4>
              <time-frame></time-frame>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Contrast from '@/components/cloudPre/hotPre/contrast';
// import Show from '@/components/cloudPre/hotPre/show';
import TimeFrame from '@/components/cloudPre/hotPre/timeframe';
// import Warning from '@/components/cloudPre/hotPre/warning';
const disks = [
  {
    time: '12a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 0, 5],
    ip: '192.168.1.170'
  },
  {
    time: '12a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 0, 6],
    ip: '192.168.1.170'
  },
  {
    time: '1a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 1, 10],
    ip: '192.168.1.170'
  },
  {
    time: '1a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 1, 1],
    ip: '192.168.1.170'
  },
  {
    time: '2a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 2, 7],
    ip: '192.168.1.170'
  },
  {
    time: '2a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 2, 5],
    ip: '192.168.1.170'
  },
  {
    time: '3a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 3, 8],
    ip: '192.168.1.170'
  },
  {
    time: '3a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 3, 1],
    ip: '192.168.1.170'
  },
  {
    time: '4a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 4, 7],
    ip: '192.168.1.170'
  },
  {
    time: '4a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 4, 3],
    ip: '192.168.1.170'
  },
  {
    time: '5a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 5, 9],
    ip: '192.168.1.170'
  },
  {
    time: '5a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 5, 9],
    ip: '192.168.1.170'
  },
  {
    time: '6a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 6, 0],
    ip: '192.168.1.170'
  },
  {
    time: '6a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 6, 0],
    ip: '192.168.1.170'
  },
  {
    time: '7a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 7, 0],
    ip: '192.168.1.170'
  },
  {
    time: '7a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 7, 2],
    ip: '192.168.1.170'
  },
  {
    time: '8a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 8, 0],
    ip: '192.168.1.170'
  },
  {
    time: '8a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 8, 1],
    ip: '192.168.1.170'
  },
  {
    time: '9a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 9, 2],
    ip: '192.168.1.170'
  },
  {
    time: '9a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 9, 8],
    ip: '192.168.1.170'
  },
  {
    time: '10a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 10, 1],
    ip: '192.168.1.170'
  },
  {
    time: '10a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 10, 5],
    ip: '192.168.1.170'
  },
  {
    time: '11a',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 11, 3],
    ip: '192.168.1.170'
  },
  {
    time: '11a',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 11, 6],
    ip: '192.168.1.170'
  },
  {
    time: '12p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 12, 6],
    ip: '192.168.1.170'
  },
  {
    time: '12p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 12, 2],
    ip: '192.168.1.170'
  },
  {
    time: '1p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 13, 0],
    ip: '192.168.1.170'
  },
  {
    time: '1p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 13, 2],
    ip: '192.168.1.170'
  },
  {
    time: '2p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 14, 2],
    ip: '192.168.1.170'
  },
  {
    time: '2p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 14, 0],
    ip: '192.168.1.170'
  },
  {
    time: '3p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 15, 10],
    ip: '192.168.1.170'
  },
  {
    time: '3p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 15, 0],
    ip: '192.168.1.170'
  },
  {
    time: '4p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 16, 7],
    ip: '192.168.1.170'
  },
  {
    time: '4p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 16, 5],
    ip: '192.168.1.170'
  },
  {
    time: '5p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 17, 0],
    ip: '192.168.1.170'
  },
  {
    time: '5p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 17, 6],
    ip: '192.168.1.170'
  },
  {
    time: '6p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 18, 3],
    ip: '192.168.1.170'
  },
  {
    time: '6p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 18, 7],
    ip: '192.168.1.170'
  },
  {
    time: '7p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 19, 1],
    ip: '192.168.1.170'
  },
  {
    time: '7p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 19, 2],
    ip: '192.168.1.170'
  },
  {
    time: '8p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 20, 5],
    ip: '192.168.1.170'
  },
  {
    time: '8p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 20, 9],
    ip: '192.168.1.170'
  },
  {
    time: '9p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 21, 1],
    ip: '192.168.1.170'
  },
  {
    time: '9p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 21, 7],
    ip: '192.168.1.170'
  },
  {
    time: '10p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 22, 14],
    ip: '192.168.1.170'
  },
  {
    time: '10p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 22, 8],
    ip: '192.168.1.170'
  },
  {
    time: '11p',
    disk_name: 'node1-disk1',
    disk_id: 1,
    node_name: 'node1',
    node_id: 1,
    data: [0, 23, 15],
    ip: '192.168.1.170'
  },
  {
    time: '11p',
    disk_name: 'node1-disk2',
    disk_id: 2,
    node_name: 'node1',
    node_id: 1,
    data: [1, 23, 8],
    ip: '192.168.1.170'
  },
  {
    time: '12a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 0, 2],
    ip: '192.168.1.240'
  },
  {
    time: '12a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 0, 4],
    ip: '192.168.1.240'
  },
  {
    time: '1a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 1, 5],
    ip: '192.168.1.240'
  },
  {
    time: '1a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 1, 0],
    ip: '192.168.1.240'
  },
  {
    time: '2a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 2, 5],
    ip: '192.168.1.240'
  },
  {
    time: '2a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 2, 0],
    ip: '192.168.1.240'
  },
  {
    time: '3a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 3, 6],
    ip: '192.168.1.240'
  },
  {
    time: '3a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 3, 0],
    ip: '192.168.1.240'
  },
  {
    time: '4a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 4, 0],
    ip: '192.168.1.240'
  },
  {
    time: '4a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 4, 0],
    ip: '192.168.1.240'
  },
  {
    time: '5a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 5, 0],
    ip: '192.168.1.240'
  },
  {
    time: '5a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 5, 0],
    ip: '192.168.1.240'
  },
  {
    time: '6a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 6, 8],
    ip: '192.168.1.240'
  },
  {
    time: '6a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 6, 0],
    ip: '192.168.1.240'
  },
  {
    time: '7a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 7, 5],
    ip: '192.168.1.240'
  },
  {
    time: '7a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 7, 6],
    ip: '192.168.1.240'
  },
  {
    time: '8a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 8, 2],
    ip: '192.168.1.240'
  },
  {
    time: '8a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 8, 7],
    ip: '192.168.1.240'
  },
  {
    time: '9a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 9, 5],
    ip: '192.168.1.240'
  },
  {
    time: '9a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 9, 11],
    ip: '192.168.1.240'
  },
  {
    time: '10a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 10, 12],
    ip: '192.168.1.240'
  },
  {
    time: '10a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 10, 9],
    ip: '192.168.1.240'
  },
  {
    time: '11a',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 11, 11],
    ip: '192.168.1.240'
  },
  {
    time: '11a',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 11, 14],
    ip: '192.168.1.240'
  },
  {
    time: '12p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 12, 5],
    ip: '192.168.1.240'
  },
  {
    time: '12p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 12, 15],
    ip: '192.168.1.240'
  },
  {
    time: '1p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 13, 8],
    ip: '192.168.1.240'
  },
  {
    time: '1p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 13, 7],
    ip: '192.168.1.240'
  },
  {
    time: '2p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 14, 5],
    ip: '192.168.1.240'
  },
  {
    time: '2p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 14, 12],
    ip: '192.168.1.240'
  },
  {
    time: '3p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 15, 6],
    ip: '192.168.1.240'
  },
  {
    time: '3p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 15, 11],
    ip: '192.168.1.240'
  },
  {
    time: '4p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 16, 9],
    ip: '192.168.1.240'
  },
  {
    time: '4p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 16, 8],
    ip: '192.168.1.240'
  },
  {
    time: '5p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 17, 2],
    ip: '192.168.1.240'
  },
  {
    time: '5p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 17, 9],
    ip: '192.168.1.240'
  },
  {
    time: '6p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 18, 14],
    ip: '192.168.1.240'
  },
  {
    time: '6p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 18, 10],
    ip: '192.168.1.240'
  },
  {
    time: '7p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 19, 11],
    ip: '192.168.1.240'
  },
  {
    time: '7p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 19, 9],
    ip: '192.168.1.240'
  },
  {
    time: '8p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 20, 10],
    ip: '192.168.1.240'
  },
  {
    time: '8p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 20, 14],
    ip: '192.168.1.240'
  },
  {
    time: '9p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 21, 12],
    ip: '192.168.1.240'
  },
  {
    time: '9p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 21, 11],
    ip: '192.168.1.240'
  },
  {
    time: '10p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 22, 11],
    ip: '192.168.1.240'
  },
  {
    time: '10p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 22, 14],
    ip: '192.168.1.240'
  },
  {
    time: '11p',
    disk_name: 'node2-disk1',
    disk_id: 1,
    node_name: 'node2',
    node_id: 2,
    data: [0, 23, 15],
    ip: '192.168.1.240'
  },
  {
    time: '11p',
    disk_name: 'node2-disk2',
    disk_id: 2,
    node_name: 'node2',
    node_id: 2,
    data: [1, 23, 15],
    ip: '192.168.1.240'
  }
];
export default {
  components: {
    Contrast,
    // Show,
    TimeFrame
  },
  data() {
    return {
      ip: '',
      num1: '5',
      num2: '5',
      value1: -1,
      nodeArr: [],
      date1: '',
      num3: 10,
      option: {
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '80%',
          y: '10%',
          left: '5%%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: [],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          // calculable: true,
          // orient: 'horizontal',
          // left: 'center',
          top: '15%'
        },
        series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: [],
          label: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    };
  },
  created() {
    // this.diskData();
    this.loadData();
  },
  mounted() {
    this.init1();
    // 获取热点节点和总节点
    var canvas = document.getElementById('meter-hot');
    // const {data} = await this.$http.get('cpu_predict_hot_spot/');
    // this.num1 = data.hot_cpu_num;
    // const data1 = data;
    // var num4 = data1.hot_cpu_num;
    // var date1 = data1.hot_clusters[0].time;
    // const res = await this.$http.get('nodes/');
    // const data2 = res.data;
    // var nodelist = [];
    // for (let a in data2) {
    //   if (data2[a].cluster_id === 1) {
    //     nodelist.push(data2[a]);
    //   }
    // }
    Meter.setOptions({
      element: 'meter',
      centerPoint: {
        x: 180,
        y: 180
      },
      radius: 180,
      data: {
        // value: num4,
        value: 10,
        title: '热点节点{t}',
        // subTitle: '评估时间:' + date1,
        subTitle: '评估时间:2018-12-09',
        area: [
          {
            min: 0,
            max: 30,
            text: '较少'
          },
          {
            min: 30,
            max: 70,
            text: '较多'
          },
          {
            min: 70,
            max: 100,
            text: '很多'
          }
        ]
      }
    }).init();
  },
  methods: {
    // async diskData() {
    //   // const { data } = await this.$http.get('disk_predict_hot_spot/');
    //   // this.num2 = data.hot_disk_num;
    // }
    init1() {
      const mychat = this.$echarts.init(this.$refs.show);
      mychat.setOption(this.option);
      window.addEventListener('resize', mychat.resize);
    },
    loadData() {
      var data1 = [];
      for (var a in disks) {
        if (disks[a].time === disks[0].time && disks[a].disk_id === 1) {
          this.nodeArr.push(disks[a]);
        }
        if (this.value1 === -1) {
          if (disks[a].node_id === 1 && disks[a].disk_id === 1) {
            this.option.xAxis.data.push(disks[a].time);
          }
          if (disks[a].time === disks[0].time && disks[a].node_id === 1) {
            this.option.yAxis.data.push(disks[a].disk_name);
            this.ip = disks[a].ip;
          }
          if (disks[a].node_id === 1) {
            data1.push(disks[a].data);
          }
        }
      }
      data1 = data1.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });
      this.option.series[0].data = data1;
    },
    handlechangeNode() {
      this.option.xAxis.data = [];
      this.option.yAxis.data = [];
      this.option.series[0].data = [];
      var timeData = [];
      var nameData = [];
      var valueData = [];
      for (var k in disks) {
        if (this.value1 === disks[k].node_id) {
          timeData.push(disks[k].time);
          nameData.push(disks[k].disk_name);
          valueData.push(disks[k].data);
          this.ip = disks[k].ip;
        }
      }
      var newTime = [];
      for (var n = 0; n < timeData.length; n++) {
        if (newTime.indexOf(timeData[n]) === -1) {
          newTime.push(timeData[n]);
        }
      }
      var newnameData = [];
      for (var r = 0; r < nameData.length; r++) {
        if (newnameData.indexOf(nameData[r]) === -1) {
          newnameData.push(nameData[r]);
        }
      }
      valueData = valueData.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });
      this.option.xAxis.data = newTime;
      this.option.yAxis.data = newnameData;
      this.option.series[0].data = valueData;
      console.log(newTime);
      console.log(newnameData);
      console.log(valueData);
      this.$nextTick(() => {
        this.init1();
      });
    }
  }
};
</script>

<style scoped>
  .warning {
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  .warning .box .title {
    padding-left: 120px;
    font-size: 18px;
    font-weight: 700;
    padding-top: -20px;
  }
  .show {
    margin-bottom: 15px;
  }
  #meter-hot {
    text-align: center;
    margin: 30px auto;
  }
  .box-hot {
    height: 390px;
    text-align: center;
    box-sizing: border-box;
  }
  .box-hot b {
    color: red;
  }
</style>
