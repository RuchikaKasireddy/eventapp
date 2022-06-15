import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image, ImageBackground, 
    SafeAreaView, TouchableWithoutFeedback
} from 'react-native'

import colors from '../config/colors'
import logo from '../images/whitelogo.png'

export default function SplashScreen({navigation}) {
    useEffect(()=>{
        setTimeout(() =>{
            navigation.navigate('GetStarted')
        }, 4000)
    }, [])
    
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../images/GV.gif')} style={styles.background}>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('GetStarted')}>
            <View style={styles.body}>
                <View style={styles.logoView}>
                    <View style={{ alignSelf: 'center' }}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <View>
                        <Text style={[styles.gvsu, {alignSelf: 'center' }]}>Grand Valley State University</Text>
                    </View>
                    <View>
                        <Text style={[styles.gvsu, {alignSelf: 'center'}]}>Events</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1
    },
    gvsu: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    logo: {
        width: 150, 
        height: 120, 
        borderRadius: 10
    },
    logoView: {
        alignSelf: 'center',
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 10
    }
})