<template>
  <el-container class="container-box">
    <el-header class="header">
      <el-row>
        <el-col :span="11">
          <el-dropdown>
            <span class="el-dropdown-link select-box">
            &nbsp;&nbsp;云 维<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>XDFS</el-dropdown-item>
              <el-dropdown-item>SSAN</el-dropdown-item>
              <el-dropdown-item>返回主页</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="13">
          <img src="../assets/img/logo.png" alt="">
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container-middle">
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo menu"
          :router=true
          :unique-opened=true
           background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="icon-trend"></i>
              <span>云预</span>
            </template>
            <el-menu-item index="/capacityPre">
              <i class="el-icon-menu"></i>
              <span>容量预测</span>
              </el-menu-item>
            <el-menu-item index="/trendPre">
              <i class="el-icon-menu"></i>
              <span>趋势预测</span>
            </el-menu-item>
            <el-menu-item index="/hotPre">
              <i class="el-icon-menu"></i>
              <span>热点预测</span>
            </el-menu-item>
            <el-menu-item index="/faultPre">
              <i class="el-icon-menu"></i>
              <span>故障预测</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2" disabled>
            <template slot="title">
              <i class="icon-node"></i>
              <span>云析</span>
            </template>
            <el-menu-item index="abnormalAna">
              <i class="el-icon-menu"></i>
              <span>异常分析</span>
            </el-menu-item>
            <el-menu-item index="bottleneckAna">
              <i class="el-icon-menu"></i>
              <span>瓶颈分析</span>
            </el-menu-item>
            <el-menu-item index="associationAna">
              <i class="el-icon-menu"></i>
              <span>关联分析</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3" disabled>
            <template slot="title">
              <i class="icon-control"></i>
              <span>云控</span>
            </template>
          </el-submenu>
          <el-menu-item index="setting">
            <i class="icon-set"></i>
            <span slot="title">基础设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-footer class="footer">
          <span>©2014-2018大道云行｜Taocloud版权所有.</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  .container-box {
    height: 100%;
    width: 100%;
  }
  .container-box .header {
    background: rgba(0, 0, 0, 0.8);
    line-height: 60px;
    color: #fff;
  }
  .container-box .header img {
    padding-top: 16px;
  }
  .container-box .header .select-box {
    color: #fff;
  }
  .container-box .aside .menu{
    height: 100%;
    box-sizing: border-box;
  }
  .container-box .aside .menu i {
    color: #fff;
  }
  .container-box .aside .menu span {
    font-size: 16px;
  }
  .container-box .main {
    background-color: #eee;
    padding: 0;
  }
  .container-box .footer {
    line-height: 60px;
    text-align: center;
  }
  i {
    padding-right: 20px;
    font-size: 20px;
  }
</style>
