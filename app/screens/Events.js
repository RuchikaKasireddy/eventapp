import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, View, Image, ActivityIndicator,
    Text, TouchableOpacity, FlatList, TextInput
} from 'react-native'

import img from '../images/getstarted.png'
import colors from '../config/colors'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from 'firebase/database'

export default function Events({navigation}) {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [allEvents, setAllEvents] = useState([])

    // Firebase Initalization
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)

    useEffect(()=>{
        onValue(ref(db, 'events'), (snapshot)=>{
            const arr = []
            const data = snapshot.val()
            const dataKeys = Object.keys(data)
            if(dataKeys.length > 0){
                dataKeys.forEach(key=>{
                    let item = data[key]
                    item.id = key
                    arr.push(item)
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

    const renderItems = ({item}) => {
        return (
            <View style={{ marginTop: 15, marginBottom: 15 }}>
                <TouchableOpacity onPress={()=>navigation.navigate({name: 'EventDetails', params:{details: item} })}>
                    <View style={styles.card}>
                        <View style={styles.image}>
                            {item?.img ? <Image source={{ uri: item.img }} style={styles.img} /> : <Image source={img} style={styles.img} />}
                        </View>
                        <View style={styles.textcontent}>
                            <Text style={styles.date} numberOfLines={1}>{new Date(item.date).toDateString()}</Text>
                            <Text style={styles.text} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.venue} numberOfLines={1}>{item.venue}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    } 
  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <View style={styles.searchView}>
                <TextInput onChangeText={text=>filter(text)} style={styles.textInput} placeholder="Search an event by title" />
            </View>
            {loading ? 
                (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color={colors.blue} size="large" />
                    </View>
                ) :
                <FlatList data={list} renderItem={renderItems} keyExtractor={item=>item?.title} />
            }
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(245, 245, 245, 1)'
    },
    date: {
        color: 'tomato',
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        width: '40%',
        height: 150,
        backgroundColor: colors.blue,
        borderRadius: 5
    },
    img: {
        // maxWidth: '100%',
        // maxHeight: '100%'
        width: '100%',
        height: 150,
        borderRadius: 5
    },
    safeareaview: {
        flex: 1
    },
    searchView: {
        marginTop: 5,
        marginBottom: 10,
        borderBottomColor: 'rgb(40,40,40)',
        borderBottomWidth: 1
    },
    textInput: {
        padding: 5,
        fontSize: 16
    },
    text: {
        fontSize: 27,
        fontWeight: 'bold',
        color: colors.darkblue,
        marginBottom: 5,
        marginTop: 5
    },
    textcontent: {
        width: '55%'
    },
    venue: {
        color: 'rgb(140, 140, 140)',
        fontSize: 16
    }
})