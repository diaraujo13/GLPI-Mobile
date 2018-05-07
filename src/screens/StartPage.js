import React, { Component } from 'react';
import { Platform, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Text, View, FlatList } from 'react-native';
import startTab from '../nav/tabs';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { getBulas, setCat, resetPage } from '../actions/bulas/bulas';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  RkButton, RkStyleSheet,
  RkText, RkCard, RkTextInput
} from 'react-native-ui-kitten';


const categoriesArray = "ABCDEFGHIJKLMNOPQRSTUVWXY".split("");

class Start extends Component {
  static navigatorStyle = {
    navBarComponentAlignment: 'center', // center/fill
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#3783ba',
    statusBarColor: '#3783ba'
  };

   items = null;
   height = +Dimensions.get('window').height;
   
   constructor(){
     super();
    }
    
    componentWillMount(){
      let width = +Dimensions.get('window').width;

      this.items = categoriesArray.map( (route, index) => {
        return (
          <RkButton
            rkType='square shadow'
            style={{ width: (width/3)-20, margin: 5, height: 80, backgroundColor: 'rgba(0,0,0,0.1)'}}
            key={index}
            onPress={() => {
                this.props.resetPage();
                this.props.setCat(route);
                this.props.navigator.push({ screen: 'BulaList',  title: route}); 
            }}>
  
            <RkText style={{fontWeight: 'bold', color: '#444444'}} rkType='xxlarge'>{route.toUpperCase()}</RkText>
  
          </RkButton>
        )
      });
    }

    componentDidMount() {
    }

    _renderHeader = () => {
      return (
        <View style={styles.searchContainer}>
          <RkTextInput autoCapitalize='none'
                       autoCorrect={false}
                       label={<RkText rkType='awesome'>{Icon.search}</RkText>}
                       rkType='row'
                       placeholder='Search'/>
        </View>
      )
    }

    render() {
      return (

        <ScrollView style={{ backgroundColor: '#F5FCFF', flex: 1, padding: 10}}>
     
  
        <ScrollView  contentContainerStyle={styles.container} >
  
          {this.items}

    
        </ScrollView>
        </ScrollView>
      );
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
  

  const styles = StyleSheet.create({
    container: { flex: 2, backgroundColor: '#F5FCFF', flexDirection: 'row', flexWrap: 'wrap' },
    rootContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    icon: { marginBottom: 16 },
    welcome: { fontSize: 20, textAlign: 'center', margin: 10, },
    instructions: { textAlign: 'center', color: '#333333', marginBottom: 5, },
    searchContainer: {  paddingHorizontal: 16, paddingVertical: 10, height: 60, alignItems: 'center' },
  });


  
  export default connect(mapStateToProps, mapDispatchToProps)(Start)
  
  