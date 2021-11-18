import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from '../screens/mainScreen/MainScreen';
import SecondScreen from '../screens/secondScreen/SecondScreen';

//App navigator, here you can add new screens
const AppNavigator = createStackNavigator({
    MainScreen: {
      screen: MainScreen,
    },
    SecondScreen: {
        screen: SecondScreen
    }
  });
  
  export default createAppContainer(AppNavigator);