<template>
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
        fontFamily: 'Roboto Condensed',
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            color: ['#cd3e49', '#33849d', '#b9e0e7', '#5f86f7', '#61c6c0'],

            name: 'Food production',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: true,
            },

            data: [
              {
                value: 1048,
                name: 'seafood',
              },
              { value: 735, name: 'meat' },
              { value: 580, name: 'wheat' },
              { value: 484, name: 'fish' },
              { value: 300, name: 'other' },
            ],
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
.icon_wrapper {
  position: absolute;
  width: 100%;
}
.icon {
  position: absolute;
  margin-top: 217px;
  margin-left: -50px;
  width: 100px;
}
.container {
  position: relative;
  height: 600px;
}
</style>

<style>
body {
  margin: 0;
}
</style>
