import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, Alert,
    StatusBar, TouchableWithoutFeedback, ScrollView, ActivityIndicator
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

import colors from '../config/colors'
import img from '../images/getstarted.png'
import ContentDisplay from '../components/ContentDisplay'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import {getStorage, ref, deleteObject} from "firebase/storage"
import { getDatabase, ref as dbRef, set } from 'firebase/database'

export default function AdminViewEvent({route, navigation}) {
    const [id, setId] = useState(null)
    const [imgRef, setImgRef] = useState(null)
    const [loading, setLoading] = useState(false)

    // Firebase Initialization
    const app = initializeApp(firebaseConfig)

    const storage = getStorage(app)

    const db = getDatabase(app)

    // End of Firebase Initialization

    useEffect(()=>{
        setId(route.params.details.id)
        if(route.params.details?.img){
            let imgSplit = route.params.details.img.split('/')
            imgSplit = imgSplit[imgSplit.length - 1]
            imgSplit = imgSplit.split('?')[0]
            imgSplit = imgSplit.replace('%2F', '/')
            setImgRef(imgSplit)
        }
    }, [loading])

    const deleteAction = () => {
        setLoading(true)
        if(imgRef){
            deleteObject(ref(storage, imgRef)).then(()=>{
                set(dbRef(db, `events/${id}`), null).then(()=>{
                    // setLoading(false)
                    Alert.alert('Event Response', 'Event successfully deleted', [
                        {
                            text: 'OK',
                            onPress: ()=>navigation.goBack()
                        }
                    ])
                }).catch(err=>{
                    setLoading(false)
                    Alert.alert('Error Message', 'Error occurred while deleting event details', [
                        {
                            text: 'OK',
                            onPress: ()=>navigation.goBack()
                        }
                    ])
                })
            }).catch(err=>{
                setLoading(false)
                Alert.alert('Error Message', `${err.message}`, [
                    {
                        text: 'OK'
                    }
                ])
            })
        }else{
            set(dbRef(db, `events/${id}`), null).then(()=>{
                //setLoading(false)
                Alert.alert('Event Response', 'Event successfully deleted', [
                    {
                        text: 'OK',
                        onPress: ()=>navigation.goBack()
                    }
                ])
            }).catch(err=>{
                setLoading(false)
                Alert.alert('Error Message', 'Error occurred while deleting event details', [
                    {
                        text: 'OK',
                        onPress: ()=>navigation.goBack()
                    }
                ])
            })
        }
    }

    const deleteEvent = () => {
        Alert.alert('Delete Event', 'Do you want to delete?', [
            {
                text: 'Cancel'
            },
            {
                text: 'OK',
                onPress: deleteAction
            }
        ])
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <StatusBar backgroundColor={colors.blue} />
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageView}>
                    {route.params.details?.img ? <Image source={{ uri: route.params.details.img }} style={styles.image} /> : <Image source={img} style={styles.image} />}
                    <View style={styles.arrow}>
                        <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={25} color={colors.white} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={styles.break} />

                <View style={styles.body}>
                    <View>
                        <Text style={styles.title}>{route.params.details.title}</Text>
                    </View>

                    <View style={styles.break} />

                    <View style={styles.contentdisplay}>
                        <ContentDisplay icon="calendar" textColor="tomato" boldText="bold" text={new Date(route.params.details.date).toDateString()} />
                        <View style={styles.break} />
                        <ContentDisplay icon="info" text={route.params.details.description} />
                        <View style={styles.break} />
                        <ContentDisplay icon="location" text={route.params.details.venue} />
                        <View style={styles.break} />
                        <ContentDisplay icon="clock" text={route.params.details.time} />
                    </View>

                    <View style={styles.break} />

                    <View style={styles.actionButtonView}>
                        <TouchableOpacity style={{ width: '45%' }} onPress={()=>navigation.navigate({name: "EditEvent", params: {details: route.params.details}})}>
                            <View style={[styles.actionButton, {backgroundColor: 'dodgerblue'}]}>
                                <AntDesign name="edit" size={20} color={colors.white} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '45%' }} onPress={deleteEvent}>
                            <View style={[styles.actionButton, {backgroundColor: 'tomato'}]}>
                                {loading ? 
                                    <ActivityIndicator size="small" color={colors.white} /> 
                                    : 
                                    <AntDesign name="delete" size={20} color={colors.white} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.break} />
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    actionButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
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
        padding: 10
    },
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.blue
    },
    contentdisplay: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 5
    },
    image: {
        width: '100%',
        height: 250
    },
    imageView: {
        width: '100%',
        height: 250
    },
    safeareaview: {
        flex: 1
    },
    title: {
        fontSize: 35,
        color: colors.white,
        fontWeight: 'bold'
    }
})