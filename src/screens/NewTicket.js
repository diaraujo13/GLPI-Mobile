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
import { API_URL, PIC_URL } from '../config/const';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RoundedBadge from '../component/roundedBadge';



 class NewTicket extends Component {
   state = {};

  constructor(){
    super();
  }

  render() {
    return (
      <View>
        <Text> My Component NewTicket </Text>
      </View>
    );
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


