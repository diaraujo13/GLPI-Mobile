import React, { Component } from 'react';
import { Platform, ActivityIndicator, ScrollView, Keyboard, Image, TouchableOpacity, Alert, Dimensions, StyleSheet, View, FlatList } from 'react-native';
import startTabs from '../nav/tabs';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { getBulas, setCat, resetPage } from '../actions/bulas/bulas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'react-native-linear-gradient';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
  Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
  CardItem, Button, Content, Icon, ActionSheet, Text, Root } from 'native-base';

import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';  
import { API_URL, CONTENT_TYPE, APP_TOKEN } from '../config/const';
import { Base64 } from '../config/base64';

/**
 * Ponto de partida para a verificação de usuário logado ou não
 */
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

      this.state = {
        siape: '',
        pass: '',
        carregando: true
      }

    }
    
    componentWillMount(){
              
        try {

          const token = await AsyncStorage.getItem('@flightech/user');

          if (!! token){
            startTabs();
          }
        } catch (error) {
          //Caso ocorra um erro apenas log
          console.log(error);
        } finally {
          this.setState({
            carregando: false,
          });
        }

    }

    componentDidMount() {
    }

    genBase64 = () => {
      return Base64.encode(this.state.siape+':'+this.state.pass);
    }
    
    authenticateUser = () => {

      console.log(this.state, this.genBase64())
      let credentials = this.genBase64();
      this.setState({carregando: true});


      var myHeaders = new Headers();

      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", 'Basic ' + credentials);
      myHeaders.append("App-Token", '1cxfro050vse2qqr827ys1pd48onu78n4nh0lokj');
      
      fetch(API_URL+'/initSession', {
        method: 'GET',
        headers: myHeaders,
        cors: true
      })
      .then(rawData => rawData.json())
      .then(async data => {
        
        
        if ( typeof data === 'object' && typeof data.session_token === 'string'){
          try {
          
            await AsyncStorage.setItem('@IF:token', data.session_token);
          
            // Se ocorrer com sucesso
            startTabs();
          
          } catch (error) {
          
            throw new Error(error);
          
          }

        }else{
          Toast.show({
                text: err.message || 'Ocorreu um erro desconhecido! Tente novamente!',
                buttonText: 'Certo',
                type: "danger"
          });
        }
      })
      .catch( err => {
        console.log(err);
        Toast.show({
            text: err.message || 'Ocorreu um erro desconhecido!',
            buttonText: 'Certo',
            type: "danger"
        });
      }).then( () => { 
           this.setState({carregando: false})
      });
    }

    render() {
      return (
        <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        <Root>
          
        <Image style={[styles.image, { width: this.width-30}]}
                      source={require('../assets/logo.png')}/>
        <View style={{flex: 1, padding: 20,  alignContent:'center', alignItems:'center', justifyContent:'center'}}>
         <RkText style={{  backgroundColor: 'transparent',
        color: '#000', fontSize: 26, fontWeight: 'bold',}}>
          <FontAwesome name='edit' size={32} color={'rgb(56,126,220)'} ></FontAwesome> Sistema de Chamados - STI 
          </RkText>
         <RkText style={{ marginVertical: 10,   backgroundColor: 'transparent',
        color: '#ccc'}}>
            Utilize suas credenciais do SUAP: Sistema Unificado de Administração Pública para acessar o sistema
          </RkText>
          <RkTextInput onChangeText={ siape => this.setState({siape})} rkType='rounded' placeholder='Matrícula SIAPE'/>
          <RkTextInput onChangeText={ pass => this.setState({pass})} rkType='rounded' placeholder='Senha' secureTextEntry={true}/>

          {
            this.state.carregando ? (
              <ActivityIndicator></ActivityIndicator>
            ):(
              <RkButton onPress={this.authenticateUser} rkType='stretch' style={[{ alignItems: 'center', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 20, justifyContent:'center' }]} >
              <RkText style={{  backgroundColor: 'transparent', color: '#fff'}}> ENTRAR NO SISTEMA </RkText>
            </RkButton>
            )
          }
         </View>
         
        </Root>

        
      </RkAvoidKeyboard>
      )
    }
  }

  /** listen state */
  const mapStateToProps = (state) => ({
  })
  
  /** dispatch actions */
  const mapDispatchToProps = dispatch => ({
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
  
  