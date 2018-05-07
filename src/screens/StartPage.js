import React, { Component } from 'react';
import { Platform, ScrollView, Keyboard, Image, TouchableOpacity, Dimensions, StyleSheet, Text, View, FlatList } from 'react-native';
import startTab from '../nav/tabs';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { getBulas, setCat, resetPage } from '../actions/bulas/bulas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';  


const categoriesArray = "ABCDEFGHIJKLMNOPQRSTUVWXY".split("");

class Start extends Component {
  static navigatorStyle = {

    navBarHidden: true,
    statusBarColor: '#000'
  };

   items = null;
   height = +Dimensions.get('window').height;
   width = +Dimensions.get('window').width;
   
   constructor(){
     super();
    }
    
    componentWillMount(){
    
    }

    componentDidMount() {
    }

   

    render() {
      return (
        <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        <Image style={[styles.image, { width: this.width-30}]}
                      source={require('../assets/logo.png')}/>
        <View style={styles.container}>
          
          <RkTextInput rkType='rounded' placeholder='Matrícula SIAPE'/>
          <RkTextInput rkType='rounded' placeholder='Senha' secureTextEntry={true}/>
          <RkButton onPress={() => {
            this.props.navigation.goBack()
          }} rkType='large' style={styles.save} text='LOGIN'/>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
      )
    }
  }

  /** listen state */
  const mapStateToProps = (state) => ({
    bulas: state.bulas.bulas 
  })
  
  /** dispatch actions */
  const mapDispatchToProps = dispatch => ({
    loadBulas: (page, cat) => dispatch(getBulas(page, cat)),
    setCat: (cat) => dispatch(setCat(cat)),
    resetPage: () => dispatch(resetPage()),
  });
  


  let styles = RkStyleSheet.create(theme => ({
    screen: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF'
    },
    image: {
      resizeMode: 'contain',
      marginBottom: 10,
    },
    container: {
      paddingHorizontal: 17,
      paddingBottom: 22,
      alignItems: 'center',
      flex: -1
    },
    footer: {
      justifyContent: 'flex-end',
      flex: 1
    },
    buttons: {
      flexDirection: 'row',
      marginBottom: 24
    },
    button: {
      marginHorizontal: 14
    },
    save: {
      marginVertical: 9
    },
    textRow: {
      justifyContent: 'center',
      flexDirection: 'row',
    }
  }));
  
  export default connect(mapStateToProps, mapDispatchToProps)(Start)
  
  