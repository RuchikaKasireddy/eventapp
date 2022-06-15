import React from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import { WebView } from 'react-native-webview';

import colors from '../config/colors'

export default function Gvsu() {
    
  return (
    <SafeAreaView style={styles.safeareaview}>
        <WebView style={styles.container} source={{ uri: 'https://gvsu.edu' }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginBottom: 20
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(245, 245, 245, 1)'
    },
    image: {
        width: '100%',
        height: 120
        // width: '70%',
        // height: 100
    },
    imageView: {
        width: '30%',
        height: 150,
        justifyContent: 'center', 
        alignItems: 'center',
        // backgroundColor: colors.blue,
        // padding: 10,
        // borderRadius: 10
    },
    safeareaview: {
        flex: 1
    },
    text: {
        fontSize: 27,
        fontWeight: 'bold'
    },
    textView: {
        width: '68%'
    }
})