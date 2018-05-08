import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform,  ScrollView, Linking, ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, View } from 'react-native';
import { bulaDetails } from '../actions/bulas/bulas';
import { addHistory } from '../actions/bulas/historico';
import { setLoading } from '../actions/util';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Details extends Component {

  componentWillMount(){
    this.props.setLoading(true);
    this.props.bulaDetails();
  }

  
  componentDidMount(){
      //adicionar como ultimo item no histórico
      //carregar + informações
      //controlar o favorito ou não
      this.props.addHistory();
  }


  _renderHeader(section) {
    
    return (
      <View style={{padding: 20,backgroundColor:'transparent', flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <H2 style={{fontWeight:'bold', color: '#3783ba'}}>{section.title}</H2>
        <Icon name="plus-circle-outline" size={20} color="#3783ba"></Icon>
      </View>
    );  
  }

  _renderContent(section) {
    return (
      <View style={{ paddingHorizontal: 20}}>
        <Text>{section.content}</Text>
      </View>
    );
  }


  render() {

    let { title, dizeres,
      antesUsar, comoUsar, 
      composicao, indicacao, funcionamento, originalSource, reacoesAdversas, contraindicacao } = this.props.bula;
      
      
      let { loading } = this.props;
      
      if(loading){
        
        return (
          <View>
          <ActivityIndicator />
        </View>
        )
        
      }else{
          let section = SECTIONS = [
            { title: 'Indicação', content: indicacao },
            { title: 'Antes de Usar', content: antesUsar },
            { title: 'Como Usar', content: comoUsar },
            { title: 'Funcionamento', content: funcionamento },
            { title: 'Composição', content: composicao },
            { title: 'Reações Adversas', content: reacoesAdversas },
          ];

      return (
        <Root>
        <Container>
        <Content>
          <View style={{alignItems:'center', justifyContent:'center', padding: 20}}>
          <Icon name='pill' size={60} color="#3783ba"></Icon>
          <H2 style={{fontWeight:'bold', color:'#3783ba', textAlign:'center'}}>{title}</H2>
         { originalSource ? (<Text onPress={()=>{
           originalSource && Linking.openURL(originalSource);
          }} style={{color:'#ccc'}}> <Icon name='link-variant' color='#ccc'/> Acesse a bula original</Text>) : null}

          </View>
            <Accordion
            style={{backgroundColor:'transparent'}}
            sections={section}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
          
        </Content>
      </Container>
        </Root>
      )
    }
  };
};

const mapStateToProps = (state) => ({
  id: state.bulas.selected,
  bula: state.bulas.selectedBula,
  loading: state.util.isLoading

})

const mapDispatchToProps = (dispatch) =>  {
  return {
    addHistory: () => dispatch(addHistory()),
    bulaDetails: ()=> dispatch(bulaDetails()),
    setLoading: (param) => dispatch(setLoading(param))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Details)
