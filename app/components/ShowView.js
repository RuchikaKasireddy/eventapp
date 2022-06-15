import React from 'react'
import {View} from 'react-native'

export default function ShowView({show, children}) {
    if(!show){
        return <View />
    }
  return (
    <View>{children}</View>
  )
}
