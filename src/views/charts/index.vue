<template>
  <div>
    <el-card class="box-card" :body-style="body_style">
      <div slot="header" class="clearfix">
        <span>类型一</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <v-chart :options="polar" />
    </el-card>
  </div>
</template>

<script>
// import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
export default {
  components: {
    // 'v-chart': ECharts
  },
  data() {
    const data = []

    for (let i = 0; i <= 360; i++) {
      const t = (i / 180) * Math.PI
      const r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    return {
      body_style: {
        width: '400px',
        height: '400px'
      },
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  }
}
</script>
<style lang="scss">
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.box-card {
	width: 480px;
	margin: 20px;
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
