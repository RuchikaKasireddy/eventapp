import React from 'react'
import {StyleSheet, View, Text, Image, FlatList, SafeAreaView, Dimensions} from 'react-native'

import colors from '../config/colors'
import logo from '../images/logo.png'

const data = [
    {name: 'International Student Services'},
    {name: 'Applied Computer Science'},
    {name: 'Graduate School'},
    {name: 'GVSU Writing Center'},
    {name: 'GVSU Alumni'}
]

export default function OrganizersScreen() {
    const renderItem = ({item}) => {
        return (
            <View style={styles.card}>
                <View style={styles.imageView}>
                    <Image source={logo} style={styles.image} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            </View>
        )
    }
  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <FlatList data={data} renderItem={renderItem} keyExtractor={item=>item.name} />
        </View>
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