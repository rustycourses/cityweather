import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import homeScreen from './app/screens/homeScreen.js';


const App = createStackNavigator({
  Home: { screen: homeScreen }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

export default App;
