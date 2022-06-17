import React from 'react'
import {StyleSheet, View, Text, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import colors from '../config/colors'
import Events from './Events'
import OrganizersScreen from './OrganizersScreen'
import Gvsu from './Gvsu'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

export default function EventScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <StatusBar backgroundColor={colors.blue} />
      <View style={styles.titleview}>
        <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableWithoutFeedback>
        <Text style={styles.title} numberOfLines={1}>Grand Valley State University - Events</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.white,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: colors.blue },
        }}
      >
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="GVSU" component={Gvsu} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeareaview: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white
  },
  titleview: {
    backgroundColor: colors.blue,
    padding: 10
  }
})