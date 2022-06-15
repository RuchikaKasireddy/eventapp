import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, SafeAreaView, StatusBar, TextInput,
    ActivityIndicator, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import colors from '../config/colors'
import img from '../images/img.jpg'
import gvsuImg from '../images/getstarted.png'

import { Ionicons } from '@expo/vector-icons'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from 'firebase/database'

export default function AllEvents({navigation}) {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [allEvents, setAllEvents] = useState([])

    // Firebase Initalization
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)

    useEffect(()=>{
        onValue(ref(db, 'events'), snapshot=>{
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
            setAllEvents(arr)
            setLoading(false)
        })
    }, [])

    const filter = text => {
        if(text !== ''){
            let arr = []
            list.forEach(item=>{
                let val = text.toLowerCase()
                let title = item.title.toLowerCase()
                if(title.indexOf(val) > -1){
                    arr.push(item)
                }
            })
            setList(arr)
        }else{
            setList(allEvents)
        }
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>navigation.navigate({name: 'AdminViewEvent', params: {details: item}})}>
                <View style={styles.card}>
                    <View style={styles.partImageView}>
                        {item?.img ? <Image source={{ uri: item.img }} style={styles.partImage} /> : <Image source={gvsuImg} style={styles.partImage} />}
                    </View>
                    <View style={styles.partContent}>
                        <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
                        <Text style={styles.text} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.venue} numberOfLines={1}>{item.venue}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
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
            <View style={styles.body}>
                <View>
                    <TextInput onChangeText={text=>filter(text)} style={styles.textInput} placeholder="Search for an event.." />
                </View>
                <View style={styles.break} />

                {loading ? 
                    <ActivityIndicator size="large" color={colors.white} /> 
                    :
                    <FlatList data={list} renderItem={renderItem} keyExtractor={item=>item?.title} />
                }
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
    body: {
        flex:1,
        padding: 10,
        backgroundColor: colors.blue
    },
    break: {
        width: '100%',
        height: 20
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: colors.blue
    },
    date: {
        color: 'tomato',
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 200
    },
    imageView: {
        width: '100%',
        height: 200
    },
    partContent: {
        width: '55%'
    },
    partImage: {
        width: '100%',
        height: 150,
        borderRadius: 5
    },
    partImageView: {
        width: '40%',
        height: 150,
        backgroundColor: colors.blue,
        borderRadius: 5
    },
    safeareaview: {
        flex: 1
    },
    text: {
        fontSize: 27,
        fontWeight: 'bold',
        color: colors.darkblue,
        marginBottom: 5,
        marginTop: 5
    },
    textInput: {
        width: '100%',
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5
    },
    venue: {
        color: 'rgb(140, 140, 140)',
        fontSize: 16
    }
})