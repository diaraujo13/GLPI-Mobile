import React, { Component } from 'react';
import { Platform, StyleSheet, Alert, View, ActivityIndicator, Dimensions, Image } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Icon, ActionSheet, Text, Root } from 'native-base';
import FotosFetchService from '../util/fetchPhoto';
import { connect } from 'react-redux';
import { addImage, delImage } from '../actions/image';

class ConfirmPic extends Component {
   state = {
    carregando: false,
   };

  constructor(){
    super();
  }

  componentWillMount(){
    console.log(this.props);  

  }

  sendImage = async () => {
 
    await this.setState({ carregando: true});

       FotosFetchService
       .send(this.props.selectedImage, this.props.id)
       .then(response => {
         if (response.status >= 400)
          throw new Error();
         else
          return response.json();
       })
       .then((resJson)=>{

          console.log(resJson);
          // Actions.pop();


          this.props.addImage({
            pos: this.props.imagesArray.length,
            image: resJson,
          });

          Alert.alert('Sucesso', 'Imagem enviada com sucesso', 
          [ 
            {text: 'OK', onPress: () =>{
              this.props.navigator.pop({
                animated: true, // does the pop have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
              });
              
            } },
          ])
        
      })
      .catch((err)=>{
        console.log('eerro0', err);


        Alert.alert('Erro', 'Imagem não foi enviada!', 
        [ 
          {text: 'OK'},
        ]);

        Toast.show({
          text: err.message || 'Ocorreu um erro desconhecido!',
          buttonText: 'Certo',
          type: "danger"
        });
      }).finally( () => {
        this.setState({ carregando: false});

      })


  }


  render() {
    if(this.state.carregando){
      return (<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator>
        </ActivityIndicator>      
        </View>
        );
    }else {
    return (
     <Root>
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
    
        <Image 
            style={{flex: 1, width: 250, resizeMode:'contain', marginVertical: 20}}
            source={{uri: 'file://'+this.props.selectedImage.path}}
        />
        <Button block success onPress={this.sendImage}>
            <Text>Confirmar envio da imagem</Text>
        </Button>
        <Button block light onPress={ () => Actions.pop() }>
            <Text>Cancelar</Text>
        </Button>
      </View>
    </Root>
    );
   }
  }
}

 /** listen global state */
 const mapStateToProps = (state) => ({
  imagesArray     :   state.image.imagesArray,
  selectedImage   :   state.image.selectedImage
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
  addImage: (imgObj) => dispatch(addImage(imgObj)),
  delImage: (pos) => dispatch(delImage(pos))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPic)
