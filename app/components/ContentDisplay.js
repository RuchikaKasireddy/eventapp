import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

import { Entypo } from '@expo/vector-icons'
import colors from '../config/colors'

export default function ContentDisplay({icon, text, textColor, boldText}) {
  return (
    <View style={styles.contentdisplay}>
        <View>
            <Entypo name={icon} size={18} color={colors.darkblue} />
        </View>
        <View style={styles.contenttext}>
            <Text style={{ fontSize: 18, color: textColor ?? 'rgb(100, 100, 100)', fontWeight: boldText ?? 'normal' }}>{text}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contentdisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contenttext: {
        width: '90%'
    }
})