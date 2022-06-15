import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

import colors from '../config/colors'

export default function Heading({text}) {
  return (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Grand Valley State University - Events</Text>
        {text ? <Text style={styles.admin}>{text ?? ''}</Text> : <View />}
    </View>
  )
}

const styles = StyleSheet.create({
    admin: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#ccc'
    },
    header: {
        backgroundColor: colors.blue,
        padding: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white
    }
})