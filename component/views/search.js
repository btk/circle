import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Dimensions, Image, Animated, Easing } from 'react-native';

import * as Api from './../../js/api';
import * as EventManager from './../../js/event';

function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {text: ""};
    //this.state = {};
    this.api = Api.get();
    this.event = EventManager.get();
  }

  searchFocus = () => {
    this.event.emit("search", {action: "focus", value: ""});
  }

  searchBlur = () => {
    this.event.emit("search", {action: "blur", value: ""});
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        placeholder="Search books, authors, genres..."
        placeholderTextColor="#a1a1a1"
        onFocus={this.searchFocus}
        onBlur={this.searchBlur}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    height: 26,
    margin: 7,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    overflow: 'hidden',
    fontSize: 13,
    paddingHorizontal: 12,
    color: '#555'
  }
});
