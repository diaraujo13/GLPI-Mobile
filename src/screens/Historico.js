import React, { Component } from 'react';
import {  View, Text, FlatList, TouchableOpacity} from 'react-native';
import { RkCard } from 'react-native-ui-kitten';

import { connect } from 'react-redux';
import { selectHistorico } from '../actions/bulas/historico';
import { selectBula } from '../actions/bulas/bulas';
 class Historico extends Component {

  static navigatorStyle = {
    navBarComponentAlignment: 'center', // center/fill
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#ddd054',
    statusBarColor: '#ddd054'
  };

  constructor(){
    super();
  }

  
  componentDidMount(){
    this.props.selectHistorico();
    
  }
  
  componentWillReceiveProps(){
    
    this.props.selectHistorico();
  }

  _renderItem = ({item, index}) => (
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
      );


  render() {
    return (
      <View>
        <FlatList
          data={this.props.historico}
          renderItem={this._renderItem}
        ></FlatList>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  historico: state.historico.historico
})

const mapDispatchToProps = (dispatch) =>({
  selectBula: (id) => dispatch(selectBula(id)),
  selectHistorico: () => dispatch(selectHistorico())
});


export default connect(mapStateToProps, mapDispatchToProps)(Historico)
