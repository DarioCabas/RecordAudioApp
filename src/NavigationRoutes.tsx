import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import Profile from './pages/Profile';

const HomeStackNavigator = createNativeStackNavigator();

const MyStack = () => {
  return (
    <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
      <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStackNavigator.Screen name="Profile" component={Profile} />
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

