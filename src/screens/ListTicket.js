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
CardItem, Button, Content, Root, Icon, ActionSheet, Text, Separator, H1, H2, H3, H4} from 'native-base';
import { connect } from 'react-redux';
import { API_URL } from '../config/const';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



class ListTicket extends Component {
   state = {
     tickets_open: [],
     tickets_closed: [],
     carregando: true
   };

  constructor(){
    super();
  }

  componentDidMount(){

    console.log(this.props);

   
    this.GetTickets();
  }


  GetTickets = async () => {

    const userId = this.props.userObj.glpiID;
    const criteria_open = `/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=1&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=contains&criteria[2][value]=2&criteria[3][link]=OR&criteria[3][itemtype]=Ticket&criteria[3][field]=12&criteria[3][searchtype]=contains&criteria[3][value]=3&criteria[4][link]=OR&criteria[4][itemtype]=Ticket&criteria[4][field]=12&criteria[4][searchtype]=contains&criteria[4][value]=4&criteria[1][link]=AND&criteria[1][itemtype]=Ticket&criteria[1][field]=4&criteria[1][searchtype]=equals&criteria[1][value]=${userId}&forcedisplay[0]=12&forcedisplay[0]=21&forcedisplay[2]=15`;
    const criteria_closed = `/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=5&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=contains&criteria[2][value]=6&criteria[1][itemtype]=Ticket&criteria[1][link]=AND&criteria[1][field]=4&criteria[1][searchtype]=equals&criteria[1][value]=${userId}&forcedisplay[0]=12&forcedisplay[0]=21&forcedisplay[2]=15`;

    let reqs = await Promise.all([
        await fetch (API_URL + criteria_open + '&session_token=' + this.props.token).then(el=>el.json()),
        await fetch (API_URL + criteria_closed + '&session_token=' + this.props.token).then(el=>el.json())
    ]);

    if (typeof reqs[0].data !== 'undefined'){
      
      this.setState({
        tickets_open:     reqs[0].data,
        tickets_closed:   reqs[1].data,
        carregando:       false
      });

    } else {

      Toast.show({
        text:  'Ocorreu um erro desconhecido! Tente novamente!',
        buttonText: 'Certo',
        type: "danger"
      });
      
      this.setState({
          carregando: false
      });
    }

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
      <Content >

      <Separator bordered>
          <H3 style={{fontWeight:'bold'}}><Text style={{color:'green'}}>•</Text> EM ABERTO</H3>
        </Separator>
          <List>
            {this.state.tickets_open.map( el => {
                return (
                    <ListItem>
                    <Text style={{fontWeight:'bold'}}>{el["1"]}</Text>
                    <Text note>{el["21"]}</Text>
                    </ListItem>
                )
            })}
          </List>

      <Separator bordered>
          <H3 style={{fontWeight:'bold'}}><Text style={{color:'#ddd'}}>•</Text> CONCLUÍDOS</H3>
      </Separator>

          <List>
            {this.state.tickets_closed.map( el => {
                return (
                    <ListItem style={{flex: 1, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                      <View style={{flexDirection:'row'}} >
                        <Text style={{flex: 1, textAlign:'left', fontWeight:'bold'}}>{el["1"]}</Text>
                        <FontAwesome name='edit' size={32} color={'rgb(56,126,220)'} ></FontAwesome> 
                      </View>
                      <View>
                        <Text note>{el["21"]}</Text>
                      </View>
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
  userObj: state.user.userObj,
  token: state.user.token
});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTicket)


