<template>
  <!-- <v-chart class="chart" :option="option" /> -->
  <vue-echarts :option="option" style="height: 500px" ref="chart" />
</template>

<script>
import { VueEcharts } from 'vue3-echarts';

export default {
  name: 'ECharts',
  components: {
    VueEcharts,
  },
  computed: {
    option() {
      return {
        textStyle: {
          fontSize: 10,
          fontFamily: 'Roboto Condensed',
        },
        title: {
          text: 'MAIN TITLE',
          subtext: 'Sub Title',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 30,
       
          },
          subtextStyle: {
            fontSize: 20,
            fontFamily: 'Roboto Condensed',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        legend: {
          orient: 'vertical',
          left: '0',
        },

        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            color: ['#cd3e49', '#33849d', '#b9e0e7', '#63adcb', '#5f86f7'],

            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 234, name: 'Ad Networks' },
              { value: 135, name: 'Video Ads' },
              { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>

<style>
body {
  margin: 0;
}
</style>
