<template>
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
</template>

<script>
export default {
  name: 'DetailsTable',
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style>

</style>
