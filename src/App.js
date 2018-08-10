import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Start from './screens/StartPage';
import SQLite from 'react-native-sqlite-storage';
import {Provider} from 'react-redux';
import store from './store';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewTicket from './screens/NewTicket';
import ListTicket from './screens/ListTicket';
import SideDrawer from './nav/drawer';
import logFetch from './config/logFetch';


const MainStore = store();

// Registro das telas para receberem um identificador
Navigation.registerComponent('start', () => Start, MainStore, Provider);
Navigation.registerComponent('SideDrawer', () => SideDrawer, MainStore, Provider);
Navigation.registerComponent('NewTicket', () => NewTicket, MainStore, Provider);
Navigation.registerComponent('ListTicket', () => ListTicket, MainStore, Provider);





Navigation.startSingleScreenApp( {
  screen: {
      title:'Login',
      screen: 'start', // unique ID registered with Navigation.registerScreen
  }
});




