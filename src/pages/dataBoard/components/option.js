//生成饼图option
export const getPieOption = (params) => {
  let {name, total, data, unit} = params
  return {
    color: ['#FF7400','#00AA92','#2175DE','#EF351F'],
    legend: {
        icon: 'circle',
        itemGap: data.length===4 ? 10 : 30,   //图例间隔
        orient: 'vertical',
        right: data.length===4 ? 12 : 24,
        top: 32,
        textStyle: {
          color: '#fff',
          lineHeight: 20
        },
        formatter: function(type) {
          for(let i=0; i<data.length; i++){
            if(data[i].name === type){
              return type + '\n'+ data[i].percent + '  ' + data[i].value + unit
            }
          }
        }
      },
    series: {
      name,
      type: 'pie',
      radius: ['36%', '56%'],
      center: [93,125],
      label: {
        position: 'center',
        formatter: () => total,
        fontSize: 23,
        color: '#fff',
        fontWeight: 'bold',
      },
      data
    }
  }
}

//生成柱状图option
export const getBarOption = (params) => {
  let {dataset, unit} = params
  let series = []
  const len = dataset.dimensions.length-2
  for(let i=0; i<len; i++){
    series.push({type: 'bar', barWidth: 8})
  }
  series.push({
    type: 'line',
    itemStyle: {
      color: '#8BFFFE',
      borderColor: '#8BFFFE',
      borderWidth: 2,
      borderType: 'solid',
      shadowBlur: 10,
      shadowColor: '#8BFFFE',
    },
    lineStyle: {
      color: '#4089E5'
    },
  })
  return {
    color: ['#FF7400','#00AA92','#2175DE','#EF351F'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      itemWidth: 10,
      itemHeight: 10,
      left: 100,
      top: 7,
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      width: 800,
      height: 180,
      left: 60,
      bottom: 30
    },
    textStyle: {
      color: '#fff',
    },
    dataset,
    // dataZoom: [
    //   {
    //     id: 'dataZoomX',
    //     type: 'slider',
    //     xAxisIndex: 0,
    //     filterMode: 'filter',
    //     startValue: 10,
    //     maxValueSpan: 6,
    //     start: 50,
    //     end: 100
    //   }
    // ],
    xAxis: {
      type: 'category',
    },
    yAxis: {
      name: '单位：' + unit,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series
  }
}

//生成中国地图option
export const getChinaMapOption = (params) => {
  return {
    tooltip: {
      formatter:function(params){
        let {name, seriesName, value, data={}} = params
        let {total=0} = data
        let tip = name + seriesName + '：' + value + '<br />' +
        '机器人调用：' + total
        //  + '<br />' +
        // '中文：' + zh + '<br />' +
        // '英文：' + en + '<br />' +
        // '粤语：' + fan
        return value ? tip : ''
      }
    },
    visualMap: {   ///视觉映射
      min: 0,
      max: 50,
      text: ['50', '0'],
      left: 10,
      inRange: {
        color: ['#4A00E0', '#8E2DE2'],
      },
      textStyle: {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    },
    geo: {
      map: 'china',
      label: {   //地图上的文字
        show: true,
        fontSize: 10,
        color: 'rgba(255,255,255,0.4)',
      },
      itemStyle: {   //地图区域多边形图形样式
        borderColor: 'rgba(255,255,255,0.3)',
        color: 'rgba(46, 0, 139, 1)'
      },
      emphasis:{   //高亮状态下地图区域的图形样式
        itemStyle: {
          areaColor: 'rgba(46, 0, 139, 1)',
          borderColor: 'rgba(255, 255, 255, 0.8)',
          shadowColor: 'rgba(255, 255, 255, 0.8)',
          shadowBlur: 6
        },
        label: {
          color: 'rgba(255, 255, 255, 1)'
        }
      }
    },
    series : [
      {
        name: '客户量',
        type: 'map',
        geoIndex: 0,
        data: params
      }
    ]
  }
}

//生成亚洲地图option
export const getAsiaMapOption = (params) => {
  return {
    title:{
      text:''
    },
    tooltip: {
      trigger: 'item',
      formatter: (params)=>{
        let {name, value, data} = params
        return name + '客户量：' + value[2] + '<br />' +
        '机器人调用：' + data.total
      }
    },
    series: [
      {
        name: '其他城市',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: params,
        symbol: 'pin',
        symbolSize: function (val) {
          return val[2]<6 ? 6 : val[2]*2
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          color: '#ddb926'
        },
        emphasis: {
          label: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        }
      },
      // {
      //   name: '主要城市',
      //   type: 'effectScatter',
      //   coordinateSystem: 'bmap',
      //   data: convertData(data.sort(function (a, b) {
      //       return b.value - a.value;
      //   }).slice(0, 6)),
      //   symbolSize: function (val) {
      //       return val[2] / 10;
      //   },
      //   showEffectOn: 'emphasis',
      //   rippleEffect: {
      //       brushType: 'stroke'
      //   },
      //   hoverAnimation: true,
      //   label: {
      //       formatter: '{b}',
      //       position: 'right',
      //       show: true
      //   },
      //   itemStyle: {
      //       color: '#f4e925',
      //       shadowBlur: 10,
      //       shadowColor: '#333'
      //   },
      //   zlevel: 1
      // }
      ],
    bmap: {
      center: [102.307698, 30.056975], // 中心位置坐标
      zoom: 4, // 地图缩放比例
      roam: false, // 用户缩放关闭
      mapStyle: {
        styleJson: mapStyle
      }
    }
  }
}

//亚洲地图样式json
const mapStyle = [{  
  'featureType': 'water',
  'elementType': 'all',
  'stylers': {
      'color': '#06011E'
  }
}, {
  'featureType': 'land',
  'elementType': 'all',
  'stylers': {
      'color': 'rgba(46, 0, 139, 1)'
  }
}, {
  'featureType': 'railway',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'highway',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'highway',
  'elementType': 'labels',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'arterial',
  'elementType': 'geometry',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'arterial',
  'elementType': 'geometry.fill',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'poi',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'green',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'subway',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'manmade',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'local',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'arterial',
  'elementType': 'labels',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'boundary',
  'elementType': 'all',
  'stylers': {
      'color': '#634D8F'
  }
}, {
  'featureType': 'building',
  'elementType': 'all',
  'stylers': {
      'visibility': 'off'
  }
}, {
  'featureType': 'label',
  'elementType': 'labels.text.fill',
  'stylers': {
    'visibility': 'off'
  }
}]