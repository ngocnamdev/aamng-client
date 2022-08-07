<template>
  <vue-echarts :option="option" style="height: 500px" ref="chart" />
</template>

<script>
import { VueEcharts } from 'vue3-echarts';

export default {
  name: 'TreeMap',
  components: {
    VueEcharts,
  },
  data() {
    return {
      option: {
        animation: 'false',

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
        series: [
          {
            type: 'treemap',
            data: [
              {
                name: 'nodeA', // First tree
                value: 5,
                children: [
                  {
                    name: 'nodeAa', // First leaf of first tree
                    value: 5,
                  },
                ],
              },
              {
                name: 'nodeA+', // First tree
                value: 2,
                children: [
                  {
                    name: 'nodeAa+', // First leaf of first tree
                    value: 2,
                  },
                ],
              },
              {
                name: 'nodeA+', // First tree
                value: 3,
                children: [
                  {
                    name: 'nodeAa+', // First leaf of first tree
                    value: 3,
                  },
                ],
              },
              {
                name: 'nodeB', // Second tree
                value: 20,
                children: [
                  {
                    name: 'nodeBa', // Son of first tree
                    value: 20,
                    children: [
                      {
                        name: 'nodeBa1', // Granson of first tree
                        value: 20,
                      },
                    ],
                  },
                ],
              },
            ],
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
