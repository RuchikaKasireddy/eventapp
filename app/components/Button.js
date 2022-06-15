import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

export default function Button({buttonColor, textColor, text, onPress, show}) {
  if(show){
    return (
      <View><Text/></View>
    )
  }
  return (
    <TouchableOpacity onPress={()=>{onPress ? onPress() : console.log('no function passed')}}>
      <View style={[styles.button, {backgroundColor: buttonColor ?? 'tomato'}]}>
        <Text style={{ fontSize: 18, color: textColor ?? 'black', fontWeight: 'bold'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '92%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center'
    }
})