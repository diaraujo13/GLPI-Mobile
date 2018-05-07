import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Start from './screens/StartPage';
import BulaList from './screens/BulaList';
import SQLite from 'react-native-sqlite-storage';
import {Provider} from 'react-redux';
import store from './store';
import Historico from './screens/Historico';
import Favoritos from './screens/Favoritos';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Details from './screens/Details';

const MainStore = store();

// Registro das telas para receberem um identificador
Navigation.registerComponent('start', () => Start, MainStore, Provider);
Navigation.registerComponent('BulaList', () => BulaList, MainStore, Provider);
Navigation.registerComponent('Historico', () => Historico, MainStore, Provider);
Navigation.registerComponent('Favoritos', () => Favoritos, MainStore, Provider);
Navigation.registerComponent('Details', () => Details, MainStore, Provider);



Promise.all([
Icon.getImageSource("view-grid", 30),
Icon.getImageSource("history", 30),
Icon.getImageSource("magnify", 30),
]).then(results => {


Navigation.startTabBasedApp({
  tabs: [
    {
      title:'Sumário',
      label: 'Sumário', // tab label as appears under the icon in iOS (optional)
      screen: 'start', // unique ID registered with Navigation.registerScreen
      icon: results[0], // local image asset for the tab icon unselected state (optional on iOS)
    }, 
    {
      title:'Histórico',
      label: "Histórico", // tab label as appears under the icon in iOS (optional)
      screen: 'Historico', // unique ID registered with Navigation.registerScreen
      icon: results[1]
    },
    {
      title:'Buscar',
      label: "Buscar", // tab label as appears under the icon in iOS (optional)
      screen: 'Favoritos', // unique ID registered with Navigation.registerScreen
      icon: results[2]
    }
  ],

  appStyle: {
    keepStyleAcrossPush: true
  }});
})



