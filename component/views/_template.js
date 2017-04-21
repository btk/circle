import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image, Animated, Easing } from 'react-native';

import * as Api from './../../js/api';

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
    this.api = Api.get();
  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
