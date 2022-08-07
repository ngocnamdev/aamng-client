export type ChartOptions = {
  tooltip: {
    trigger: string,
    axisPointer: {
      type: string // The default is a straight line, optional:'line' |'shadow'
    }
  },
  grid: {
    left: string,
    right: string,
    top: string,
    bottom: string,
    containLabel: boolean
  },
  xAxis: XAxis[],
  yAxis: [
    {
      type: string,
      splitLine: {
        show: boolean
      }
    }
  ],
  series: ChartSeries[]
}

export type ChartSeries = {
  name: string,
  type: string,
  data: number[],
  color: string
}

export type XAxis = {
  type: string,
  data: string[]
}

export type ColumnSeries = {
  name: string,
  value: number,
  avatar: {
    icon: string,
    color: string,
    textColor: string
  }
}