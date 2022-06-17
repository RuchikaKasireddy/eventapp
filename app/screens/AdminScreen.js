import React from 'react'
import {StyleSheet, View, Text, ScrollView, StatusBar, 
    SafeAreaView, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import colors from '../config/colors'

import Heading from './Heading'

export default function AdminScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.blue} />
            <Heading text="Administrative - Dashboard" />
            <View style={{backgroundColor: colors.blue, padding: 10}}>
                <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={colors.white} />
                </TouchableWithoutFeedback>
            </View>
            <View style={{ padding: 20, flex: 1 }}>
                <ScrollView>
                    <View style={{ marginBottom: 10}}>
                        <Text style={styles.title}>EVENTS</Text>
                    </View>

                    <View style={styles.between}>
                        <TouchableOpacity onPress={()=>navigation.navigate('NewEvent')} style={{ width: '35%' }}>
                            <View style={styles.button}>
                                <FontAwesome name="plus" size={40} color={colors.white} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Add New Event</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.navigate('AllEvents')} style={{ width: '35%' }}>
                            <View style={[styles.button, {backgroundColor: 'rgba(103, 192, 255, 1)'}]}>
                                <Entypo name="list" size={40} color={colors.white} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>All Events</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 50}} />

                    <View style={{ marginBottom: 10}}>
                        <Text style={styles.title}>ATTENDANCE</Text>
                    </View>

                    <View style={styles.between}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Attendance')} style={{ width: '35%' }}>
                            <View style={styles.button}>
                                <Ionicons name="people" size={40} color={colors.white} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Attendance List</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.navigate('Graph')} style={{ width: '35%' }}>
                            <View style={[styles.button, {backgroundColor: 'rgba(103, 192, 255, 1)'}]}>
                                <Foundation name="graph-pie" size={40} color={colors.white} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Graph</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 20}} />
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    between: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '100%',
        height: 120,
        backgroundColor: 'rgba(255, 157, 103, 1)',
        borderRadius: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    safeareaview: {
        flex: 1
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'rgb(10,10,10)'
    }
})