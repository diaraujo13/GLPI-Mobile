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
import { Platform, StyleSheet, View, Dimensions, Image } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Icon, ActionSheet, Text } from 'native-base';

export default class ListTicket extends Component {
   state = {
     tickets: []
   };

  constructor(){
    super();
  }

  componentDidMount(){
    this.GetTickets();
  }

  GetTickets = () => {
    fetch(MAIN_URL +'/client-aircraft-list/5b1a38f52da1fe545f57446a', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(rawData => rawData.json())
    .then(data => {
          this.setState({tickets: data})
    })
    .catch( err => {
        console.log(err);            
        Toast.show({
            text: err.message || 'Ocorreu um erro desconhecido ao carregar a lista!',
            buttonText: 'Certo',
            type: "danger"
        });
    }).then( () => { 
        this.setState({carregando: false})
    });
  }
  render() {
    if(this.state.carregando){
      return (<View style={{backgroundColor: "white", flex: 1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator>
        </ActivityIndicator>      
        </View>
        );
    }else {
    return (
     <Root>
      <Container>
      <Content>
          <List>
            {this.state.tickets.map( el => {
                return (
                    <ListItem thumbnail>
                       <Text>TESTE</Text>
                    </ListItem>
                )
            })}
          </List>
        </Content>
      </Container>
    </Root>
    );
   }
  }
}