import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image, Animated, Easing } from 'react-native';

import * as Api from './../../js/api';
import SvgUri from 'react-native-svg-uri';

function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
    //this.state = {};
    // buttonText
    // icon
    // bigText
    // subText
    // buttonAction
    this.api = Api.get();
  }

  renderIcon(){
    if(this.props.icon == "shelf"){
      return require('./../../svg/add.svg');
    }else{
      return require('./../../svg/circles.svg');
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{height: getSize().width/3}}>
        <SvgUri
          width={getSize().width/3}
          height={getSize().width/3}
          style={{opacity: 0.7}}
          source={this.renderIcon()}/>
      </View>
        <Text style={styles.bigText}>{this.props.bigText}</Text>
        <Text style={styles.subText}>{this.props.subText}</Text>
        <TouchableOpacity style={styles.get} onPress={() => this.props.buttonAction()}>
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: getSize().height - 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  get: {
    width: 200,
    height: 30,
    backgroundColor: "#489154",
    borderRadius:3,
    marginVertical: 20,
    overflow: 'hidden'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30
  },
  bigText: { fontSize: 20, marginVertical: 10, marginHorizontal: 3},
  subText: { fontSize: 14, color: '#777', marginHorizontal: 5, textAlign: 'center',
             marginHorizontal:20, lineHeight: 21},
});
