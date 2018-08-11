import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Root, Icon, ActionSheet, Text, Separator, H1, H2, H3, H4} from 'native-base';
import { connect } from 'react-redux';
import { API_URL } from '../config/const';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class RoundedBadge extends React.PureComponent {

   
    render(){
        let {props} = this;
        let color = '', text = '';

        switch (props.id) {
            case 1:
                color = '#ad2';
                text = 'Novo';
            break;
            case 2:
                color = '#5c7615';
                text = 'Processando (atribuído)';
            break;
            case 3:
                color = '#5c7615';
                text = 'Processando (planejado)';
            break;    
            case 4:
                color = '#f2b924';
                text = 'Pendente';
            break;
            case 5:
                color = '#c42727';
                text = 'Solucionado';
            break;
            case 6:
                color = '#c42727';
                text = 'Fechado';
            break;    
            default:
                color = 'black';
                text = 'Fechado';
    
                break;
        }
        return (
            <View style={{flexDirection:'row'}}>
                    <Text style={{ alignSelf:'flex-start', color: color, fontSize: 55}}> • </Text>
                    <Text>{text}</Text>
            </View>
        );
    }
}

export default RoundedBadge;