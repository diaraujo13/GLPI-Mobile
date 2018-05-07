import React, { Component } from 'react';
import { Platform,  ScrollView, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';

import { getBulas, selectBula, addHistory } from '../actions/bulas/bulas';
import { RkCard } from 'react-native-ui-kitten';


class BulaList extends Component {
  constructor(){
    super();
  }

  componentDidMount(){
    this.props.loadBulas();
  }
  render() {
    return (
        <ScrollView style={{flex: 1}}>
           
            <FlatList 
            ListHeaderComponent={ ()=>{
              return <Text style={{color: '#3783ba', fontWeight:'bold', margin: 5}}>{this.props.bulas.length} resultados retornados.</Text>
            }}
              onEndReache={()=>this.props.loadBulas()}
              data={this.props.bulas}

              renderItem={ ({item, index}) => {
                return (
                
                  <TouchableOpacity
                  onPress={()=>{
                    this.props.selectBula(item.id);
                    this.props.navigator.push({screen: "Details", title: item.title});
                  }} 
                  >        
                <RkCard style={{margin: 5}} key={item.id} rkType='shadowed'>
                    <View rkCardHeader>
                      <Text>{item.title}</Text>
                    </View>
                </RkCard>
                </TouchableOpacity>        
                )
              }}
              />
        </ScrollView>
    )
  }
};


// "Redux States" -> Component props
const mapStateToProps = (state) => ({
    bulas: state.bulas.bulas
})

const mapDispatchToProps = dispatch => ({
  loadBulas: () => dispatch(getBulas()),
  selectBula: (id) => dispatch( selectBula(id)),
  addHistory: () => dispatch(addHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(BulaList)
