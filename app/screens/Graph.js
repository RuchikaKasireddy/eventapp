import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, SafeAreaView, 
    StatusBar, TouchableWithoutFeedback, ScrollView
} from 'react-native'

import colors from '../config/colors'
import Bar from '../components/chart/Bar'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from 'firebase/database'
import Heading from './Heading'

import { Ionicons } from '@expo/vector-icons'

export default function Graph({navigation}) {
    const [data, setData] = useState(null)
    // Firebase Initialization
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)

    useEffect(() => {
        onValue(ref(db, 'events'), snapshot=>{
            const labels = []
            const dataArr = []
            const arr = []
            const data = snapshot.val()
            const datakeys = Object.keys(data)

            if(datakeys.length > 0){
                datakeys.forEach(key=>{
                    let obj = data[key]
                    obj.key = key
                    obj.attending = obj?.attending ? obj.attending : []
                    arr.push(obj)
                })
            }

            if(arr.length > 0){
                arr.forEach(item=>{
                    let titleArr = item.title.split(' ')
                    let str = ''
                    if(titleArr.length > 0){
                        titleArr.forEach(el=>{
                            str+= el[0]
                            str =  str.toUpperCase()
                        })
                    }else{
                        str = titleArr[0][0]
                        str = str.toUpperCase()
                    }
                    // labels.push(item.title)
                    labels.push(str)
                    dataArr.push(item.attending.length)
                })
            }

            if(labels.length > 0){
                const object = {
                    labels,
                    datasets: [
                        {
                            data: dataArr
                        }
                    ]
                }
                setData(object)
            }
        })
    }, [])

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.blue} />
        <View style={styles.container}>
            <Heading text="Administrative - Dashboard" />
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <View>
                    <Ionicons name="arrow-back-outline" size={25} color="black" />
                </View>
            </TouchableWithoutFeedback>

            <ScrollView>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold' }}>Event Attendance Graph</Text>
                </View>
                {data ? <Bar data={data} height={400} /> : <View/>}
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeareaview: {
        flex: 1
    }
})