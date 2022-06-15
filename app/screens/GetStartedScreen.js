import React from 'react'
import {StyleSheet, View, Text, Image, ImageBackground, 
    StatusBar, SafeAreaView, TouchableOpacity
} from 'react-native'

import colors from '../config/colors'
import logo from '../images/whitelogo.png'

export default function GetStartedScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeareaview}>
        <ImageBackground source={require('../images/getstarted.png')} style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.blue} />
        <View style={styles.container}>
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
        </View>

        <View style={styles.getStartedView}>
            <TouchableOpacity style={{ width: '90%'}} onPress={()=>navigation.navigate('EventScreen')}>
                <View style={styles.getStartedButton}>
                    <Text style={styles.getStartedText}>View Events</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.bottomPosition}>
            <View style={styles.loginView}>
                <Text style={styles.login} onPress={()=>navigation.navigate('AdminLogin')}>Admin Login</Text>
            </View>
        </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    bottomPosition: {
        position: 'absolute',
        bottom: '5%',
        right: '5%'
    },
    container: {
        flex: 1
    },
    getStartedButton: {
        width: '100%',
        backgroundColor: colors.blue,
        padding: 13,
        alignItems: 'center',
        borderRadius: 5
    },
    getStartedText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    getStartedView: {
        position: 'absolute',
        bottom: '40%',
        width: '100%',
        alignItems: 'center'
    },
    gvsuText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.white
    },
    login: {
        color: colors.white,
        fontSize: 20
    },
    loginView: {
        borderBottomWidth: 2,
        borderBottomColor: colors.white,
        paddingBottom: 2
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
    statusbar: {
        backgroundColor: colors.blue
    }
})