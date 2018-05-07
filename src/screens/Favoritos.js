import React, { Component } from 'react';
import { Platform, TextInput, StatusBar, ScrollView, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Item, Input, Icon, Button } from 'native-base';
import { setSearchKey, querySearch } from '../actions/bulas/search';
import {connect} from 'react-redux';
import { RkCard } from 'react-native-ui-kitten';
import { selectBula, selectBulaDetails } from '../actions/bulas/bulas';

 class Favoritos extends Component {

  static navigatorStyle = {
    navBarComponentAlignment: 'center', // center/fill
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f44f4f',
    statusBarColor: '#f44f4f'
  };

  constructor(){
    super();
  }

  componentWillMount(){
    this.timer = null;
  }

  makeSearch = (text) => {
    clearTimeout(this.timer);

    this.timer = setTimeout(()=>{
        this.props.querySearch(text);
    }, 1000);
  }

  render() {
    return (
      <Container>

        <TextInput
        onChangeText={this.makeSearch}
        ></TextInput>
<FlatList 
            ListHeaderComponent={ ()=>{
              return <Text style={{color: '#3783ba', fontWeight:'bold', margin: 5}}>{this.props.bulas.length} resultados retornados.</Text>
            }}
            data={this.props.bulas}
              renderItem={ ({item, index}) => {
                return (
                  <TouchableOpacity
                  onPress={()=>{ 
                    
                  this.props.selectBula(item.id);
                  
                  this.props.navigator.push({screen: "Details", title: item.title}); }} >        
                  <RkCard style={{margin: 5}} key={item.id} rkType='shadowed'>
                      <View rkCardHeader>
                        <Text>{item.title}</Text>
                      </View>
                  </RkCard>
                </TouchableOpacity>        
                )
              }}
              />         
    </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  bulas: state.search.bulas
})

const mapDispatchToProps = (dispatch)=>({
  setSearchKey: (text) => dispatch(setSearchKey(text)),
  querySearch: (text) => dispatch(querySearch(text)),
  selectBula: (id) => dispatch(selectBula(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(Favoritos)
