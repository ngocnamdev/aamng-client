<template>
  <vue-echarts :option="option" style="height: 500px" ref="chart" />
</template>

<script>
import { VueEcharts } from 'vue3-echarts';
import products from '../assets/data.json';

export default {
  name: 'EchartsSankey3',

  components: {
    VueEcharts,
  },
  data() {
    return {
      option: {
        textStyle: {
          fontSize: 10,
          fontFamily: 'Roboto Condensed',
        },
        color: [
          '#cd3e49',
          '#33849d',
          '#b9e0e7',
          '#5f86f7',
          '#61c6c0',
          '#b6517f',
          '#a63246',
          '#5f8943',
          '#c4ccd3',
        ],
        title: {
          text: 'Sankey Diagram',
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        series: [
          {
            type: 'sankey',
            data: products.nodes,
            links: products.links,
            emphasis: {
              focus: 'adjacency',
            },
            lineStyle: {
              color: 'gradient',
              curveness: 0.5,
            },
          },
        ],
      },
    };
  },
};
</script>



<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
