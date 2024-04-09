<template>
  <div>
    <div class="chart" ref="diskUsageChart" style="height: 300px;"></div>
<!--    <div class="chart" ref="diskTypeChart" style="height: 300px;"></div>-->
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getServer } from "@/api/monitor/server";

export default {
  data() {
    return {
      serverInfo: null
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getServer().then(response => {
        console.log(response)
        this.serverInfo = response.data;
        this.renderCharts();
      });
    },
    renderCharts() {
      this.renderDiskUsageChart();
      this.renderDiskTypeChart();
    },
    renderDiskUsageChart() {
      const chartData = this.serverInfo.sysFiles.map(file => {
        return {
          name: file.dirName,
          value: file.usage
        };
      });
      const chart = echarts.init(this.$refs.diskUsageChart);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: chartData.map(item => item.name),
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Disk Usage',
          type: 'bar',
          data: chartData.map(item => item.value)
        }]
      });
    },
    renderDiskTypeChart() {
      const chartData = this.serverInfo.sysFiles.map(file => {
        return {
          name: file.sysTypeName,
          value: file.usage
        };
      });
      const chart = echarts.init(this.$refs.diskTypeChart);
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: 'Disk Type',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });
    }
  }
};
</script>
