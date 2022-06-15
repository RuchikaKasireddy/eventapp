import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './app/screens/SplashScreen'
import GetStartedScreen from './app/screens/GetStartedScreen'
import AdminLoginScreen from './app/screens/AdminLoginScreen'
import EventScreen from './app/screens/EventScreen'
import EventDetails from './app/screens/EventDetails'
import AdminScreen from './app/screens/AdminScreen'
import NewEventScreen from './app/screens/NewEventScreen'
import Attendance from './app/screens/Attendance'
import AttendanceList from './app/screens/AttendanceList'
import AllEvents from './app/screens/AllEvents'
import Graph from './app/screens/Graph'
import AdminViewEvent from './app/screens/AdminViewEvent'
import EditEventScreen from './app/screens/EditEventScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventScreen" component={EventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewEvent" component={NewEventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Attendance" component={Attendance} options={{ headerShown: false }} />
        <Stack.Screen name="AttendanceList" component={AttendanceList} options={{ headerShown: false }} />
        <Stack.Screen name="AllEvents" component={AllEvents} options={{ headerShown: false }} />
        <Stack.Screen name="Graph" component={Graph} options={{ headerShown: false }} />
        <Stack.Screen name="AdminViewEvent" component={AdminViewEvent} options={{ headerShown: false }} />
        <Stack.Screen name="EditEvent" component={EditEventScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
