import React, {useState} from 'react'
import {StyleSheet, Image, View, Text, ScrollView, SafeAreaView, StatusBar, Alert,
    TextInput, TouchableOpacity, Button, ActivityIndicator, TouchableWithoutFeedback
} from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker"
import * as ImagePicker from 'expo-image-picker'
import DropDownPicker from 'react-native-dropdown-picker'

import colors from '../config/colors'
import Heading from './Heading'
import { Ionicons } from '@expo/vector-icons'

// My firebase credentials
import firebaseConfig from '../firebase/firebase'

// Firebase Import
import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getDatabase, push, ref as dbRef } from 'firebase/database'

export default function NewEventScreen({navigation}) {
    const [uploading, setUploading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [venue, setVenue] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isTimeVisible, setIsTimeVisible] = useState(false)
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')

    // DropDown picker
    const [open, setOpen] = useState(false);
    const [dept, setDept] = useState(null);
    const [items, setItems] = useState([
      {label: 'International Student Services', value: 'International Student Services'},
      {label: 'Applied Computer Science', value: 'Applied Computer Science'},
      {label: 'Graduate School', value: 'Graduate School'},
      {label: 'GVSU Writing Center', value: 'GVSU Writing Center'},
      {label: 'GVSU Alumni', value: 'GVSU Alumni'}
    ]);
    // End of DropDown picker

    // Firebase Initialization
    const app = initializeApp(firebaseConfig)

    const storage = getStorage(app)

    const db = getDatabase(app)

    // End of Firebase Initialization

    const openPicker = () => {
        setIsVisible(true)
    }

    const closePicker = () => {
        setIsVisible(false)
    }

    const handleConfirm = date => {
        let d = new Date(date).toLocaleDateString().toString()
        setDate(d)
        closePicker()
        Alert.alert('Event Date', 'Event date has been set', [
            {
                text: 'OK'
            }
        ])
    }

    const openTimePicker = () => {
        setIsTimeVisible(true)
    }

    const closeTimePicker = () => {
        setIsTimeVisible(false)
    }

    const handleConfirmTime = time => {
        let t = new Date(time)
        let timeData = `${t.getHours()}:${t.getMinutes()}`
        setTime(timeData)
        Alert.alert('Event Time', 'Event time has been set', [
            {
                text: 'OK'
            }
        ])
    }

    const openGallery = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result)

        if(!result.cancelled){
            setImage(result.uri)
        }
    }

    const okayButton = () => {
        setTitle('')
        setDescription('')
        setVenue('')
        setDate('')
        setTime('')
        setImage(null)
        setDept(null)
    }

    const createEvent = async() => {
        if(image){
            if(title && description && venue && dept && date && time && image){
                setUploading(true)
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                    resolve(xhr.response);
                    };
                    xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", image, true);
                    xhr.send(null);
                })

                const rand = Math.floor(Math.random() * 1000000000)
                const storageRef = ref(storage, `event-images/image${rand}`)

                uploadBytes(storageRef, blob).then((snapshot)=>{
                    getDownloadURL(snapshot.ref).then(url=>{
                        const dataObj = {
                            title,
                            description,
                            venue,
                            date,
                            organizer: dept,
                            time,
                            img: url
                        }
                        push(dbRef(db, 'events'), dataObj).then(()=>{
                            setUploading(false)
                            Alert.alert('New Event', 'Event created', [
                                {
                                    text: 'OK',
                                    onPress: okayButton
                                }
                            ])
                        })
                    })
                })
            }else{
                setUploading(false)
                Alert.alert('New Event', 'Form is not sufficiently filled', [
                    {
                        text: 'OK'
                    }
                ])
            }
        }else{
            if(title && description && venue && dept && date && time){
                const dataObj = {
                    title,
                    description,
                    venue,
                    date,
                    organizer: dept,
                    time,
                    img: null
                }

                push(dbRef(db, 'events'), dataObj).then(()=>{
                    setUploading(false)
                    // setError('Event created')
                    // setTimeout(()=>setError(''), 3000)
                    Alert.alert('New Event', 'Event created', [
                        {
                            text: 'OK',
                            onPress: okayButton
                        }
                    ])
                })
            }else{
                setUploading(false)
                // setError('Form is not sufficiently filled')
                // setTimeout(()=>setError(''), 3000)
                Alert.alert('New Event', 'Form is not sufficiently filled', [
                    {
                        text: 'OK'
                    }
                ])
            }
        }
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.blue} />
            <Heading text="Administrative - Dashboard" />
            <View>
                <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={25} color="black" />
                </TouchableWithoutFeedback>
            </View>
            <View style={{ padding: 20, flex: 1 }}>
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.title}>Add New Event</Text>
                    </View>
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.labelText}>Title</Text>
                            <TextInput value={title} onChangeText={text=>setTitle(text)} style={styles.textInput} placeholder="Type Event Title here" />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.labelText}>Description</Text>
                            <TextInput value={description} onChangeText={text=>setDescription(text)} multiline={true} style={styles.textInput} placeholder="Type Event Description here.." />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.labelText}>Department</Text>
                            <DropDownPicker zIndex={10000}
                                open={open}
                                value={dept}
                                items={items}
                                setOpen={setOpen}
                                setValue={setDept}
                                setItems={setItems}
                                listMode="SCROLLVIEW"
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.labelText}>Venue</Text>
                            <TextInput value={venue} onChangeText={text=>setVenue(text)} style={styles.textInput} placeholder="Type Event Venue here" />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{ width: '45%', flexDirection: 'column' }}>
                                    <Text style={styles.labelText}>Select Date</Text>
                                    <Button title="Pick a date" onPress={openPicker} />
                                    <DateTimePickerModal
                                        isVisible={isVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={closePicker}
                                    />
                                </View>

                                <View style={{ width: '45%', flexDirection: 'column' }}>
                                    <Text style={styles.labelText}>Select Time</Text>
                                    <Button title="Pick a time" onPress={openTimePicker} />
                                    <DateTimePickerModal
                                        isVisible={isTimeVisible}
                                        mode="time"
                                        onConfirm={handleConfirmTime}
                                        onCancel={closeTimePicker}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginBottom: 30 }}>
                            <Text style={styles.labelText}>Select an Image</Text>
                            {image ? <Image source={{ uri: image }} style={styles.image} /> : <View />}
                            <Button title='Open Gallery' onPress={openGallery} />
                        </View>

                        {/* <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>{error}</Text>
                        </View> */}

                        <TouchableOpacity onPress={createEvent}>
                            <View style={styles.createButton}>
                                {!uploading ? <Text style={styles.createText}>Create Event</Text> : <ActivityIndicator size="large" color={colors.white} />}
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: '100%', height: 20 }} />
                    </View>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    createButton: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.blue
    },
    createText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10
    },
    safeareaview: {
        flex: 1
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textInput: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: colors.white
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})