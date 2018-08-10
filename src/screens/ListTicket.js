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
CardItem, Button, Content, Root, Icon, ActionSheet, Text } from 'native-base';
import { connect } from 'react-redux';
import { API_URL } from '../config/const';
class ListTicket extends Component {
   state = {
     tickets: [],
     userConfig: ''
   };

  constructor(){
    super();
  }

  componentDidMount(){

    console.log(this.props);

   
    this.GetTickets();
  }


  GetTickets = () => {
   
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

        <Text>{JSON.stringify(this.props.userConfig)}</Text>

        
          <List>
            {this.state.tickets.map( el => {
                return (
                    <ListItem thumbnail>
                       <Text>{JSON.stringify(this.props.userObj)}</Text>
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

 /** listen state */
const mapStateToProps = (state) => ({
  userConfig: state.user,
  userObj: state.userObj
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTicket)


