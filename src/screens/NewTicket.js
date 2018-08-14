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
import { Platform, StyleSheet, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CheckBox, CardItem, Button, Content, Root,  Textarea, Icon, ActionSheet, Text, Separator, H1, H2, H3, H4, Picker} from 'native-base';
import { connect } from 'react-redux';
import { API_URL, PIC_URL, PLAIN_URL } from '../config/const';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RoundedBadge from '../component/roundedBadge';
import ImagePicker from 'react-native-image-picker';
import { RkButton, RkText, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTheme } from 'react-native-ui-kitten'; 

 class NewTicket extends Component {
   state = {
      categorias: [],
      localizacoes: [],

      localizacaoId: null,
      categoriaId: null,


      carregando: true
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


  uploadPhoto = () => {


    var options = {
        title: 'Nova foto da aeronave',
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };


      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        console.log(response.uri);
        console.log(response.type);
        console.log(response.fileName);
        
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
      
          let data = new FormData();
          data.append('avatar',  {
            uri:  response.uri,
            type: response.type, // or photo.type
            name: response.fileName
          });


          fetch('http://helpdesk.santamaria.ifsertao-pe.edu.br/front/fileupload.php?name=filename&showfilesize=1'  , {
            method: 'POST',
            headers: new Headers({
              'Content-Type' : 'multipart/form-data',
              'Accept'       : 'application/json',
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsiaWQiOiI1YjFhMzkxNjJkYTFmZTU0NWY1NzQ0NmIifSwiaWF0IjoxNTMyMDE3MDg4LCJleHAiOjE1MzIxMDM0ODh9.-_Y583Rp_QkI-eyEcEp0YroiTtWqrzdaLZddDn24WhA'
            }),
            body: data
          }).catch(err => {
              Toast.show({
                text: err.message || 'Ocorreu um erro desconhecido!',
                buttonText: 'Certo',
                type: "success"
            });
          })
          .then(res => {
            Toast.show({
              text: 'Imagem atualizada com sucesso!',
              buttonText: 'Certo',
              type: "success"
            });
          });
        }
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
          else this.attach(response, id);
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
                  <Item stacked>
                    <Label>Título</Label>
                    <Input />
                  </Item>
                  <Item style={{ borderBottomColor:'transparent'}} bordered={false}>
                    <Label>Descrição</Label>
                  </Item>
                  <Item>
                    <Textarea rowSpan={5} style={{flex: 1, marginRight: 10}} bordered placeholder="Descreva seu chamado" />
                  </Item>

                  <Item fixedLabel>
                   <Label>Categoria</Label>
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    style={{ flex: 1, flexShrink: 1 }}
                    selectedValue={this.state.categoriaId}
                    onValueChange={ categoriaId => this.setState({ categoriaId })}

                  >
                    {
                      this.state.categorias.map( el => <Picker.Item label={el.completename} value={el.id} />)
                    }
                  </Picker>
                  </Item>  
                 <Item fixedLabel>
                   <Label>Localização</Label>
                 <Picker
                    note
                    mode="dropdown"
                    style={{ flex: 1, flexShrink: 1 }}
                    selectedValue={this.state.localizacaoId}
                    onValueChange={ localizacaoId => this.setState({ localizacaoId})}
                  >
                    {
                      this.state.localizacoes.map( el => <Picker.Item label={el.completename} value={el.id} />)
                    }
                  </Picker>
                  </Item>  

                  <Item>
                    
                   <Button iconLeft onPress={this.pickImage}>         
                   
                      <Icon name='add' style={{ color: '#fff', fontSize: 20,}} color={'white'}/>

                    <Text>Adicionar foto</Text>
                  </Button>
                  </Item>
          
                </Form>
                </Card>

                   <Button block>
                    <Text>Abrir chamado</Text>
                  </Button>
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
  token: state.user.token
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket)


