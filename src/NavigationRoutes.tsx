import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';

const HomeStackNavigator = createNativeStackNavigator();

const MyStack = () => {
  return (
    <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
      <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStackNavigator.Navigator>
  );
};

export const NavigationRoutes = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
