import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import CameraComponent from './screens/Camera';
const Stack = createNativeStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
         <Stack.Screen name="camera" component={CameraComponent} options={{headerShown:false}}/>
         </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main