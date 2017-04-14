import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';

import Header from './header';
import SvgUri from 'react-native-svg-uri';
import * as EventManager from './../js/event.js';

function getSize() {
  return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.event = EventManager.getEvent();

  }

  closeReader = () => {
    this.setState({readerStatus: false});
  }

  render() {
    return( <View style={styles.readerCarrier}>
              <Header />
              <Text>Reader: {this.props.bookId}</Text>
              <TouchableOpacity onPress={this.props.close}><Text>Close</Text></TouchableOpacity>
            </View>);
  }
}

const styles = StyleSheet.create({
  readerCarrier: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left:0,
    width: getSize().width,
    height: getSize().height,
  }
});
