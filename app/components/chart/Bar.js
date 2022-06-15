import React from 'react'
import {Dimensions} from 'react-native'
import {BarChart} from "react-native-chart-kit"

import chartConfig from '../../config/chartConfig'


export default function Bar({data, height}) {
  return (
    <BarChart 
      data={data}
      chartConfig={chartConfig}
      width={Dimensions.get("window").width} // from react-native
      height={height}
      yAxisInterval={1} // optional, defaults to 1
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 1
      }}
    />
  )
}
