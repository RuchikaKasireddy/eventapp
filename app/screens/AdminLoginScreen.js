import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, TextInput, Alert,
    ImageBackground, Image, ScrollView, Text, TouchableOpacity, StatusBar
} from 'react-native'

import colors from '../config/colors'
import logo from  '../images/whitelogo.png'

export default function AdminLoginScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    const login = () => {
        if(username !== '' && password !== '') {
            // setError('Valid')
            if(username === 'admin' && password === 'pass'){
                navigation.navigate('Admin')
            }else{
                Alert.alert('Admin Login', 'Invalid login credentials', [
                    {
                        text: 'OK'
                    }
                ])
            }
        }else{
            // setError('Username and password is required')
            // setTimeout(() => setError(''), 3000)
            Alert.alert('Admin Login', 'Login credentials required', [
                {
                    text: 'OK'
                }
            ])
        }
    }

  return (
    <SafeAreaView style={styles.safeareaview}>
        <ImageBackground source={require('../images/getstarted.png')} style={styles.container}>
            <StatusBar backgroundColor={colors.blue} />
            <ScrollView>
                <View style={styles.logoheader}>
                    <View style={{ alignSelf: 'center' }}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.gvsuText}>Grand Valley State University</Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.gvsuText}>Events</Text>
                    </View>
                </View>

                <View style={styles.break} />

                <View style={styles.loginForm}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.gvsuText}>Admin Login</Text>
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={styles.labelText}>Username</Text>
                        <TextInput value={username} onChangeText={text=>setUsername(text)} placeholder="Enter username" style={styles.textInput} />
                    </View>
                    <View style={{ marginBottom: 5}}>
                        <Text style={styles.labelText}>Password</Text>
                        <TextInput value={password} onChangeText={text=>setPassword(text)} secureTextEntry placeholder="Enter password" style={styles.textInput} />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    
                    <TouchableOpacity onPress={login}>
                        <View style={styles.loginButton}>
                            <Text style={styles.loginBtnText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    break: {
        width: '100%',
        height: 20
    },
    container: {
        flex: 1
    },
    errorText: {
        color: colors.white
    },
    getStartedText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    gvsuText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.white
    },
    labelText: {
        color: colors.white,
        marginBottom: 5
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: 'rgb(80, 200, 100)',
        padding: 10,
        borderRadius: 50
    },
    loginBtnText: {
        color: 'white', 
        fontSize: 20
    },
    loginForm: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.blue,
        padding: 20,
        borderRadius: 5
    },
    logo: {
        width: 120,
        height: 100,
    },
    logoheader: {
        alignSelf: 'center'
    },
    safeareaview: {
        flex: 1
    },
    textInput: {
        padding: 15,
        backgroundColor: colors.white,
        color: 'black',
        borderRadius: 5
    }
})