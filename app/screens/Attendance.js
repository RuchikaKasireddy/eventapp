import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, FlatList, SafeAreaView, TouchableWithoutFeedback,
    TouchableOpacity, StatusBar, Image, TextInput, ActivityIndicator, ScrollView
} from 'react-native'

import colors from '../config/colors'
import img from '../images/img.jpg'

import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from 'firebase/database'

export default function Attendance({navigation}) {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [allAttendance, setAllAttendance] = useState([])
    // Firebase Initialization
    const app = initializeApp(firebaseConfig)

    const db = getDatabase(app)

    useEffect(()=>{
        const dbRef = ref(db, 'events')
        onValue(dbRef, snapshot=>{
            const arr = []
            const data = snapshot.val()
            const datakeys = Object.keys(data)
            if(datakeys.length > 0){
                datakeys.forEach(key=>{
                    let obj = data[key]
                    obj.id = key
                    obj.attending = obj?.attending ? obj.attending : []
                    arr.push(obj)
                })
            }
            setList(arr)
            setAllAttendance(arr)
            setLoading(false)
        })
    }, [])

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>navigation.navigate({name: 'AttendanceList', params: {details: item}})}>
                <View style={styles.list}>
                    <View style={styles.listTitle}>
                        <Text numberOfLines={2} style={styles.listTitleText}>{item.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Organized by: </Text>
                            <Text numberOfLines={1}>{item.organizer}</Text>
                        </View>
                    </View>
                    <View style={styles.listAttendance}>
                        <View><Feather name="users" size={40} color={item.attending.length > 0 ? 'green' : 'red'} /></View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Attendance: </Text>
                            <Text>{item.attending.length}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const filterList = text => {
        console.log(text)
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.blue} />
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={img} style={styles.image} />
                <View style={styles.arrow}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={25} color={colors.white} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.holder}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Events Attendance</Text>
                </View>
                <View style={styles.textInputView}>
                    <TextInput onChangeText={text=>filterList(text)} placeholder="Search for events..." style={styles.textInput}/>
                </View>

                <View style={{ flex: 1 }}>
                    {loading ? 
                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <ActivityIndicator color={colors.white} size="large" />
                        </View> 
                        : 
                        <FlatList data={list} renderItem={renderItem} keyExtractor={item=>item?.title} />
                    }
                </View>

                {/* <View style={styles.break} /> */}
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    arrow: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 50
    },
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.blue
    },
    holder: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.blue
    },
    image: {
        width: '100%',
        height: 200
    },
    imageView: {
        width: '100%',
        height: 200
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginBottom: 15
    },
    listTitle: {
        width: '69%'
    },
    listTitleText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: colors.blue
    },
    listAttendance: {
        width: '29%',
        alignItems: 'center',
    },
    safeareaview: {
        flex: 1
    },
    textInput: {
        width: '100%',
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        fontSize: 15
    },
    textInputView: {
        marginBottom: 10
    },
    title: {
        color: colors.white,
        fontWeight: 'bold', 
        fontSize: 27
    },
    titleView: {
        alignItems: 'center',
        marginBottom: 10
    }
})