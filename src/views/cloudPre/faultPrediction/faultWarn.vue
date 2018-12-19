<template>
  <div class="box-container">
    <el-row :gutter="20">
      <el-col :span="17">
        <el-row class="faultpro m20">
          <el-col :xl="24">
            <el-card>
              <fault-pro></fault-pro>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="24">
            <el-card>
              <h4>故障总揽</h4>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="故障分布" name="first">
                  <failure-dis></failure-dis>
                </el-tab-pane>
                <el-tab-pane label="历史记录" name="second">
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xl="7">
        <el-row>
          <el-col :xl="24">
            <el-card shadow="never" class="fault-warn m20">
              <h4>故障预警</h4>
              <div class="status-ball el-col-24">
                <div class="box">
                  <div class="box2">
                    <span class="box-text">{{health}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320"     height="320" viewBox="0 0 320 320">
                      <g fill="rgba(245,1,1,.4)" transform="translate(-903.868 0)">
                        <path d="M-38.232,70c90-22.667,180-22.667,270,0s180,22.667,270,0s180-22.667,270,0s180,22.667,270,0v570h-1080V0" transform="translate(-38.232284367796474, 0)" ></path>
                        <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-540" dur="4s" repeatCount="indefinite"></animateTransform>
                      </g>
                      <g fill="rgba(245,1,1,.9)">
                        <defs>
                          <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="40%" style="stop-color:rgb(245,1,1);stop-opacity:.1" />
                            <stop offset="100%" style="stop-color:rgb(194,53,54);stop-opacity:1"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,70c50-20.667,100-20.667,150,0s100,20.667,150,0s100-20.667,150,0s100,20.667,150,0s100-20.667,150,0v444.5H0V0" fill="url(#grad1)"/>
                        <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-300" dur="3s" repeatCount="indefinite"></animateTransform>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <h4 class="advise">建议：<span>预测未来一段时间内硬盘存在风险</span></h4>
            </el-card>
          </el-col>
          <el-col :xl="24">
            <el-card shadow="never" class="fault-info">
              <h4>故障统计</h4>
              <el-row class="statistics-warp">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="fault-num">
                  <h1>{{clusterfault}}</h1>
                  <span>风险集群统计</span>
                  <el-progress :text-inside="false" :stroke-width="6" :percentage="20" class="progress-clusert"></el-progress>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="fault-num">
                  <h1>{{nodefault}}</h1>
                  <span>风险节点统计</span>
                  <el-progress :text-inside="false" :stroke-width="6" :percentage="40"  class="progress-node"></el-progress>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="fault-num">
                  <h1>{{diskfault}}</h1>
                  <span>风险硬盘统计</span>
                  <el-progress :text-inside="false" :stroke-width="6" :percentage="20"  class="progress-disk"></el-progress>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FailureDis from '@/components/cloudPre/faultPre/failureDis';
import FaultPro from '@/components/cloudPre/faultPre/faultPro';
export default {
  name: 'FaultWarn',
  components: {
    FailureDis,
    FaultPro
  },
  data() {
    return {
      activeName: 'first',
      health: '风险较高',
      clusterfault: 1,
      nodefault: 1,
      diskfault: 5

    };
  }
};
</script>

<style scoped>
  .faultpro {
    width: 100%;
  }
  .fault-warn {
    height: 500px;
    width: 100%;
  }
  .fault-info {
    height: 220px;
    width: 100%;
  }
  .box {
    width: 320px;
    height: 320px;
    border-radius: 50%;
    position:relative;
    box-shadow: 0px 0px 20px rgba(44,109,239,.2);
    margin:30px auto;
  }
  .box::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
		margin: auto;
		width: 280px;
		height: 280px;
		background: #fff;
		border: 1px solid rgba(159,164,192,.3);
		border-radius: 50%;

	}
  .box2 {
  width: 200px;
	height: 200px;
	box-shadow: 2px 2px 10px rgba(44,109,239,.2) inset;
	border-radius: 50%;
	overflow: hidden;
	background: #f9fafc;
	position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
	margin: auto;
  }
  .box-text{
	position: absolute;
	top: 56%;
	left:50%;
	margin-left:-40px;
	font-size: 22px;
	color: aliceblue
  }
  .advise{
  text-align: center
  }
.statistics-warp{
  margin:10px;
}
.fault-num {
  text-align: center;
}
.fault-num h1 {
  font-size:28px;
  color:#4a4a4a;
}
.fault-num span {
  font-size: 14px;
}
.el-progress__text {
  display:none;
}
.el-progress-bar__outer {
  width:100px;
}
.el-progress__text {
  display:none;
}
.fault-num:nth-of-type(2) {
  border-left: 1px solid #e9ecef;
}
.fault-num:nth-of-type(3) {
  border-left: 1px solid #e9ecef;
}
.progress-disk .el-progress-bar__inner {
  background:#f6b61e;
}
.progress-node .el-progress-bar__inner {
  background:#36bea6;
}
.el-progress-bar__outer {
  width:100px;
}
.el-progress-bar {
  margin-top:30px;
}
</style>
