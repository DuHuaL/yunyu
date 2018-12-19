<template>
  <div class="box-container">
    <el-card>
      <h4>故障日志</h4>
      <el-row class="search" :gutter="10">
        <el-col :span="4" class="search">
            <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select" clearable @change="handleSearch(searchKey)">
            <el-button icon="el-icon-search"  type="primary"  @click="handleSearch" slot="append"></el-button>
            </el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value1" placeholder="请选择" @change="handlechangecluster">
            <el-option label="全部集群" :value="-1"></el-option>
            <el-option
              v-for="item1 in clusterArr"
              :key="item1.cluster_id"
              :label="item1.cluster_name"
              :value="item1.cluster_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-select v-model="value2" placeholder="请选择" @change="handlechangenode">
            <el-option label="全部节点" :value="-1"></el-option>
            <el-option
              v-for="item in nodeArr"
              :key="item.node_id"
              :label="item.node_name"
              :value="item.node_id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          class="table"
          border
          stripe
          :data="tableData"
          style="width: 100%">
          <el-table-column
            class="head"
            prop="cluster_name"
            label="集群"
            width="180">
          </el-table-column>
          <el-table-column
            class="head"
            prop="node_name"
            label="节点"
            width="180">
          </el-table-column>
          <el-table-column
            class="head"
            prop="disk_name"
            label="硬盘"
            width="180">
          </el-table-column>
          <el-table-column
            class="head"
            prop="fail_desc"
            label="故障分析"
            width="896">
          </el-table-column>
          <el-table-column
            class="head"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger" icon="el-icon-delete"
                plain
                @click="handleDelete(scope.row.disk_id)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="5">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
const disks = [
  {
    time: '2018-12-14',
    cluster_name: 'cluster1',
    cluster_id: 1,
    node_name: 'cluster1_node1',
    node_id: 1,
    disk_name: 'node1_disk1',
    disk_id: 1,
    fail_desc: '无法校正的错误'
  },
  {
    time: '2018-12-14',
    cluster_name: 'cluster1',
    cluster_id: 1,
    node_name: 'cluster1_node1',
    node_id: 1,
    disk_name: 'node1_disk2',
    disk_id: 2,
    fail_desc: '数据地址标记错误'
  },
  {
    time: '2018-12-14',
    cluster_name: 'cluster1',
    cluster_id: 1,
    node_name: 'cluster1_node1',
    node_id: 1,
    disk_name: 'node1_disk3',
    disk_id: 3,
    fail_desc: '主轴过电流异常'
  },
  {
    time: '2018-12-14',
    cluster_name: 'cluster1',
    cluster_id: 1,
    node_name: 'cluster1_node1',
    node_id: 1,
    disk_name: 'node1_disk4',
    disk_id: 4,
    fail_desc: '读取错误重试率异常'
  },
  {
    time: '2018-12-14',
    cluster_name: 'cluster1',
    cluster_id: 1,
    node_name: 'cluster1_node1',
    node_id: 1,
    disk_name: 'node1_disk5',
    disk_id: 5,
    fail_desc: '硬盘内部的当前温度过高'
  },
];
export default {
  name: 'AnaReport',
  data() {
    return {
      searchKey: '',
      value1: -1,
      value2: -1,
      clusterArr: [],
      nodeArr: [],
      tableData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       console.log(`当前页: ${val}`);
    },
    loadData() {
      this.tableData = disks;
      // this.clusterArr.push(disks[0]);
      // this.nodeArr.push(disks[0].node_name);
    },
    handleSearch() {
      var arr = [];
      var reg = new RegExp(this.searchKey);
      if (this.searchKey === '') {
        this.loadData();
      } else if (this.searchKey !== '') {
        for (var i = 0; i < this.tableData.length; i++) {
          if (reg.test(this.tableData[i].disk_name)) {
            arr.push(this.tableData[i]);
          }
        }
        this.tableData = arr;
      }
    },
    handlechangecluster() {
      // this.clusterArr = [];
      if (this.value1 === -1) {
        // this.loadData();
      }
      if (this.value1 === disks[0].cluster_id) {
        this.nodeArr.push(disks[0]);
      }
    },
    handlechangenode() {
      // this.nodeArr = [];
      if (this.value2 === -1) {
        // this.loadData();
      }
    },
    handleDelete(id) {
      for (var d in disks) {
        if (disks[d].disk_id === id) {
          var index = this.tableData.indexOf(disks[d]);
        }
      }
      this.tableData.splice(index, 1);
    }
  }
};
</script>

<style scoped>
  .table {
    margin-top: 20px;
    /* height: 600px; */

  }

</style>
