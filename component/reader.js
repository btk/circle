import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';

import Header from './header';
import SvgUri from 'react-native-svg-uri';
import * as EventManager from './../js/event.js';
import * as StoredApi from './../storedapi.js';

function getSize() {
  return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {bookLoad: false};
    this.event = EventManager.getEvent();
    this.api = StoredApi.getApi();
    this.getBook();
  }

  getBook = () => {
    this.api.getBookById(this.props.bookId).then((resp) => {
      this.book = resp;
      this.setState({bookLoad: true});
    });
  }

  render() {
    if(this.state.bookLoad){
      return( <View style={styles.readerCarrier}>
                <Header currentTab={"Chapter 1"}/>
                <Text>Reader: {this.props.bookId}</Text>
                <TouchableOpacity onPress={this.props.close}><Text>Close</Text></TouchableOpacity>
              </View>);
    }else{
      return(null);
    }

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
