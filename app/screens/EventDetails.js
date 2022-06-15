import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, Image, SafeAreaView, TextInput, ActivityIndicator,
    ScrollView, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Share, Alert
} from 'react-native'

import * as Sharing from 'expo-sharing'

import { Entypo } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import img from '../images/getstarted.png'

import colors from '../config/colors'
import ContentDisplay from '../components/ContentDisplay'
import Button from '../components/Button'
import ShowView from '../components/ShowView'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, set } from 'firebase/database'

export default function EventDetails({route, navigation}) {
    const [cancel, setCancel] = useState(false)
    const [loading, setLoading] = useState(false)
    const [gNumber, setGNumber] = useState('')
    const [fullname, setFullname] = useState('')
    const [attending, setAttending] = useState(true)
    const [regForm, setRegForm] = useState(false)
    const [error, setError] = useState('')
    const [organization, setOrganization] = useState(null)

    // Firebase Initalization
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)

    const openForm = () => {
        setRegForm(true)
    }

    const register = () => {
        if(gNumber !== '' && fullname !== ''){
            setLoading(true)
            const {attending, id} = organization
            const findItem = attending.find(item=>Number(item.gNumber) === Number(gNumber))

            if(!findItem){
                attending.push({gNumber: Number(gNumber), fullname})
                let obj = {...organization}
                obj.attending = attending
                set(ref(db, `events/${id}`), obj).then(()=>{
                    setAttending(false)
                    setRegForm(!regForm)
                    setLoading(false)
                    Alert.alert(`${route.params.details.title}`, 'You have successfully registered for this event', [
                        {
                            text: 'OK'
                        }
                    ])
                    
                })
            }else{
                setLoading(false)
                // setError('Already registered attendance for this event')
                Alert.alert(`${route.params.details.title}`, 'You have already registered for this event', [
                    {
                        text: 'OK'
                    }
                ])
                setTimeout(() => {
                    // setError('')
                    setAttending(false)
                    setRegForm(!regForm)
                }, 1500)
            }
        }else if(gNumber !== '' && fullname === ''){
            setError('Fullname is required')
            setTimeout(() =>setError(''), 3000)
        }else if(gNumber === '' && fullname !== ''){
            setError('GNumber is required')
            setTimeout(() => setError(''), 3000)
        }else{
            setError('All the fields are required')
            setTimeout(() => setError(''), 3000)
        }
    }

    const cancelAttendance = () => {
        setCancel(true)
        const {attending, id} = organization
        const filterList = attending.filter(item=>Number(item.gNumber) !== Number(gNumber))
        let obj = {...organization}
        obj.attending = filterList
        set(ref(db, `events/${id}`), obj).then(()=>{
            setCancel(false)
            setAttending(true)
            setRegForm(!regForm)
            Alert.alert(`${route.params.details.title}`, `Event reservation cancelled`, [
                {
                    text: 'OK'
                }
            ])
        })
    }

    const onShare = async() => {
        try{
            if(route.params.details.img){
                const result = await Share.share({
                    message: route.params.details.description,
                    url: route.params.details.img,
                    title: route.params.details.title
                })
                if(result.action === Share.sharedAction){
                    if(result.activityType){
                        Alert.alert('Social Share', `Event shared with ${result.activityType}`, [
                            {
                                text: 'OK'
                            }
                        ])
                    }else{
                        // Alert.alert('Social Share', 'Event shared', [
                        //     {
                        //         text: 'OK'
                        //     }
                        // ])
                    }
                }else if(result.action === Share.dismissedAction){
                    Alert.alert('Social Share', 'Share action dismissed', [
                        {
                            text: 'OK'
                        }
                    ])
                }
            }else{
                const result = await Share.share({
                    message: route.params.details.description
                })
                if(result.action === Share.sharedAction){
                    console.log('img activityType',result.activityType)
                }else if(result.action === Share.dismissedAction){
                    console.log('sharing dismissed')
                }
            }
        }catch(e){
            Alert.alert('Social Share', 'Share error occurred', [
                {
                    text: 'OK'
                }
            ])
        }
    }

    useEffect(()=>{
        let organizerObj = route.params.details
        organizerObj.attending = organizerObj?.attending ?? []
        setOrganization(organizerObj)
    }, [regForm, attending, loading, cancel])
  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.blue} />
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

                <View style={styles.content}>
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
                        <View style={styles.shareView}>
                            <TouchableOpacity onPress={onShare}>
                                <View style={{ padding: 10, backgroundColor: 'tomato', borderRadius: 50 }}>
                                    <Entypo name="share" size={24} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.break} />

                <ShowView show={regForm}>
                    <View style={{ padding: 10 }}>
                        <View style={styles.form}>
                            <Text style={[styles.formTitle, {marginBottom: 10}]}>Register Attendance</Text>
                            <View>
                                <Text style={styles.textLabel}>Enter GNumber</Text>
                                <TextInput onChangeText={text=>setGNumber(text)} value={gNumber} style={styles.textInput} placeholder="Enter your GNumber here" />
                            </View>
                            <View>
                                <Text style={styles.textLabel}>Enter Fullname</Text>
                                <TextInput onChangeText={text=>setFullname(text)} value={fullname} style={styles.textInput} placeholder="Enter your fullname" />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: colors.white, fontSize: 14 }}>{error}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={register}>
                                <View style={styles.formButton}>
                                    {loading ? 
                                        <ActivityIndicator size="large" color={colors.white} /> 
                                        :
                                        <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20}}>Register</Text>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.break} />
                        </View>
                    </View>
                </ShowView>

                {cancel ? <View style={{ marginBottom: 10 }}><ActivityIndicator size="large" color={colors.white} /></View> : <View />}
                {attending ? <Button show={regForm} onPress={openForm} textColor={colors.white} text="Attend Event" /> : <Button onPress={cancelAttendance} buttonColor={colors.white} text="Cancel Attendance" />}

                <View style={{ width: '100%', height: 50 }} />
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.blue
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
    content: {
        padding: 10
    },
    contentdisplay: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 5
    },
    contenticon: {
        padding: 10
    },
    form: {
        padding: 10,
        backgroundColor: 'tomato',
        borderRadius: 5
    },
    formButton: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 5
    },
    formTitle: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageView: {
        width: '100%',
        height: 400,
        position: 'relative',
        backgroundColor: colors.blue
    },
    image: {
        width: '100%',
        height: 400
    },
    safeareaview: {
        flex: 1
    },
    shareView: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textInput: {
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 5,
        marginBottom: 10
    },
    textLabel: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 35,
        color: colors.white,
        fontWeight: 'bold'
    }
})