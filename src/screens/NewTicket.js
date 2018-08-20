/*************************************************************************
*
*  [2017] Izaías Araújo
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Izaías Araújo and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Izaías Araújo
* and its suppliers and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Izaías Araújo.
*/

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CheckBox, CardItem, Button, Content, Root,  Textarea, Icon, ActionSheet, Text, Separator, H1, H2, H3, H4, Picker} from 'native-base';
import { connect } from 'react-redux';
import { API_URL, PIC_URL, PLAIN_URL } from '../config/const';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RoundedBadge from '../component/roundedBadge';
import ImagePicker from 'react-native-image-picker';
import { RkButton, RkText, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTheme } from 'react-native-ui-kitten'; 
import { setImage, delImage } from '../actions/image';

 class NewTicket extends Component {
   state = {
      categorias: [],
      localizacoes: [],

      locations_id: 0,
      itilcategories_id: 0,


      carregando: true,


      urgency: 5,
      impact: 5,
      type: 1,
      
   };

  constructor(){
    super();
  }

  componentWillMount(){
    this.GetNecessaryData();
  }

  GetNecessaryData = async () => {

   Promise.all([
     await fetch(API_URL + '/ITILcategory?' + 'session_token=' + this.props.token)
          .then( data => data.json()),
     await fetch(API_URL + '/Location?' + 'session_token=' + this.props.token)
          .then( data => data.json()),
   ])
   .then( reqs => {
     console.log(reqs);
      this.setState({
        categorias: reqs[0],
        localizacoes: reqs[1] 
      });
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




  pickImage = async (id) => {
    console.log(id);


      const options = {
          title: 'Selecione o anexo',
          cancelButtonTitle: 'Cancelar',
          takePhotoButtonTitle: 'Fotografar...',
          chooseFromLibraryButtonTitle: 'Escolher da Galeria...'
      };


      ImagePicker.showImagePicker(options, async (response) => {
          if(response.didCancel) return;
          else {
            
            this.props.setImage(response);

            this.props.navigator.push({
              screen: 'ConfirmPic',
              animated: true,
              animationType: 'fade'
          });
        }
      });
  }

  imagesToText = async (values = []) => {
    let descr = "---------------------\nANEXOS\n---------------------\n\n";

    await values
    .map( el => descr += el.image.data.link.concat("\n") );

    console.log(descr);

    return descr;
  }

  openTicket = () => {
    this.setState({ carregando: true });

    let {
      locations_id,
      itilcategories_id,
      name,
      content,
      urgency,
      type,
      impact
    } = this.state;

    if ( !locations_id ||
        !itilcategories_id ||
        !name,
        !content
    ){

      Alert.alert('Oops!', 'Por favor, preencha todos os campos necessários');
      return;
    }


    //console.log(this.props.imagesArray);
   

    let descr = "---------------------\nANEXOS\n---------------------\n\n";

    this.props.imagesArray
    .map( el => descr += el.image.data.link + "\n" );

    content += '\n\n\n' + descr;
    console.log(descr, content);
    debugger
    fetch(API_URL + '/Ticket?session_token='+this.props.token, {
    method: 'POST',
    headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        input: {
          locations_id,
          itilcategories_id,
          name,
          content,
          urgency,
          type,
          impact
        }
      }
    )
    })
    .then(rawData => rawData.json())
    .then(data => {
          console.log(data);

          this.setState({carregando: false})
          Alert.alert('Sucesso', data.message, [ 
            {text: 'OK', onPress: () =>{
              this.props.navigator.pop({
                animated: true, // does the pop have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
              });
              
            } },
          ]);
    })
    .catch( err => {
         console.log(err);
         Alert.alert('Oops', 'Chamado criado com erro');
    }).then( () => { 
         this.setState({carregando: false})
    });
  }


  render() {
    if(this.state.carregando){
      return (
      <View style={{backgroundColor: "white", flex: 1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator />
      </View>
      );
    }
    else{
      return (
        <Root>
          <Container>
              <Content style={{padding: 10}}>
              <Card >
                <Form style={{paddingBottom:10}}> 
                <Item  bordered={false} style={{ borderBottomColor:'transparent'}} >
                    <Text style={{fontWeight:'bold', marginVertical: 10, flex: 1,}} >DESCRIÇÃO</Text>
                </Item>
                  <Item stacked>
                    <Label>Título</Label>
                    <Input onChangeText={ name => this.setState({name}) }/>
                  </Item>
                  <Item style={{ borderBottomColor:'transparent'}} bordered={false}>
                    <Label>Descrição</Label>
                  </Item>
                  <Item>
                    <Textarea 
                      onChangeText={ content => this.setState({content}) }
                      rowSpan={5} style={{flex: 1, marginRight: 10}} 
                      bordered placeholder="Descreva seu chamado" />
                  </Item>

                  <Item fixedLabel>
                   <Label>Categoria</Label>
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }} 
                    style={{ flex: 1, flexShrink: 1 }}
                    selectedValue={this.state.itilcategories_id}
                    onValueChange={ itilcategories_id => this.setState({ itilcategories_id })}>
                    { this.state.categorias.map( el => <Picker.Item label={el.completename} value={el.id} />) }
                  </Picker>
                  </Item>  
                 <Item fixedLabel>
                   <Label>Localização</Label>
                 <Picker
                    note
                    mode="dropdown"
                    style={{ flex: 1, flexShrink: 1 }}
                    selectedValue={this.state.locations_id}
                    onValueChange={ locations_id => this.setState({ locations_id})} >
                    { this.state.localizacoes.map( el => <Picker.Item label={el.completename} value={el.id} />) }
                  </Picker>
                  </Item>  

                  <Item  bordered={false} style={{ borderBottomColor:'transparent'}} >
                    <Text style={{fontWeight:'bold', marginVertical: 20, flex: 1,}} >LISTA DE FOTOS</Text>
                  </Item>
                  <Item>
                    
                   <Button light full style={{flex: 1, marginRight: 15, alignItems:'center', justifyContent:'center'}} onPress={this.pickImage}>         
                   
                      <FontAwesome name='upload' style={{ textAlign:'center', color: 'dodgerblue', fontSize: 20,}} color={'#444'}/>

                    <Text style={{color: 'dodgerblue', fontWeight:'bold'}}>Adicionar foto</Text>
                  </Button>
                  </Item>

                  <Item bordered={false} style={{ borderBottomColor:'transparent', flexDirection:'column'}} >

                    { this.props.imagesArray.length > 0 ?(this.props.imagesArray.map( el => {
                    return (
                    <View light full style={{flex: 1, flexDirection:'row', marginRight: 15, alignItems:'center', justifyContent:'center'}}>         

                        <Image style={{margin: 20, flex: 1, width: 100, height: 100, resizeMode:'cover'}} source={{uri: el.image.data.link}}></Image>

                        <Text style={{flex: 1, color:'red'}}>{el.image.data.link} </Text>
                        
                        <TouchableOpacity light onPress={ () => {
                          this.props.delImage(el.pos)
                        }}>
                          <FontAwesome name='close' style={{ textAlign:'center', color: '#FF4500', fontSize: 20,}} color={'#444'}/>
                        </TouchableOpacity>
                    </View>)
                    })) : <Text>Sem imagens para anexar</Text> }
                  </Item>
                </Form>
                   <Button style={{marginBottom: 20}} block onPress={ this.openTicket}>
                    <Text>Abrir chamado</Text>
                  </Button>
                </Card>

              </Content>
            </Container>
        </Root>
    );
    } //fim do else
  }
}


 /** listen state */
 const mapStateToProps = (state) => ({
  userConfig: state.user,
  userObj: state.user.userObj,
  token: state.user.token,
  imagesArray : state.image.imagesArray,
  
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
  setImage: (objImg) => dispatch(setImage(objImg)),
  delImage: (pos) => dispatch(delImage(pos))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket)


