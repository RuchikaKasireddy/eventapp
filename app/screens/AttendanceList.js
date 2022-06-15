import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, FlatList, SafeAreaView, 
    StatusBar, Image, TextInput, TouchableWithoutFeedback
} from 'react-native'

import colors from '../config/colors'
import img from '../images/img.jpg'

import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export default function Attendance({route, navigation}) {
    const [list, setList] = useState([])
    const [allAttendance, setAllAttendance] = useState([])

    useEffect(()=>{
        setList(route.params.details.attending)
        setAllAttendance(route.params.details.attending)
    }, [])

    const renderItem = ({item}) => {
        return (
            <View style={{ padding: 10, borderRadius: 5, backgroundColor: colors.white, marginBottom: 10}}>
                <Text style={{ fontSize: 18 }}>{item.fullname}</Text>
            </View>
        )
    }

    const filterList = text => {
        if(text !== ''){
            let arr = []
            list.forEach(item=>{
                let val = text.toLowerCase()
                let title = item.fullname.toLowerCase()
                if(title.indexOf(val) > -1){
                    arr.push(item)
                }
            })
            setList(arr)
        }else{
            setList(allAttendance)
        }
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.blue} />
        <View style={styles.container}>
            <View>
                <Image source={{ uri: route.params.details.img }} style={styles.image} />
                <View style={styles.arrow}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={25} color={colors.white} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: colors.white }}>
                <View style={styles.list}>
                    <View style={styles.listTitle}>
                        <Text style={styles.listTitleText}>{route.params.details.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Organized by: </Text>
                            <Text numberOfLines={1}>{route.params.details.organizer}</Text>
                        </View>
                    </View>
                    <View style={styles.listAttendance}>
                        <View><Feather name="users" size={40} color={route.params.details.attending.length > 0 ? 'green' : 'red'} /></View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Attendance: </Text>
                            <Text>{route.params.details.attending.length}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.holder}>
                <View style={styles.textInputView}>
                    <TextInput onChangeText={text=>filterList(text)} placeholder="Search for attendant by name..." style={styles.textInput}/>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList data={list} renderItem={renderItem} keyExtractor={item=>item?.gNumber} />
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
        marginBottom: 20
    },
    title: {
        color: colors.white,
        fontWeight: 'bold', 
        fontSize: 27
    },
    titleView: {
        alignItems: 'center',
        marginBottom: 20
    }
})