import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from './component/header';
import Navbar from './component/navbar';
import Content from './component/content';
import Reader from './component/reader';
import RawApi from './api';
import * as StoredApi from './storedapi';
import * as EventManager from './js/event.js';
import File from './js/file.js';

import SvgUri from 'react-native-svg-uri';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.defaultTab = 'store';
    this.state = {
      currentTab: this.defaultTab,
      readerStatus: false,
      currentBookId: 0
    };
    // Create and store the Api
    let api = new RawApi();
    StoredApi.storeApi(api);
    EventManager.storeEvent();
    this.api = StoredApi.getApi();
    this.event = EventManager.getEvent();

    let f = new File();
  }

  componentDidMount(){
    this.event.on('reader', (data) => {
      if (data.bookId) {
        this.setState({
          readerStatus: true,
          currentBookId: data.bookId
        });
      }
    });
  }

  closeReader = () => {
    this.setState({readerStatus: false});
  }

  tabChanged = (tab) => {
      console.log("Tab Changed To: ", tab);
      this.setState({
        currentTab: tab
      });
  }

  render() {
    if(this.state.readerStatus){
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <Reader close={this.closeReader.bind(this)} bookId={this.state.currentBookId}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
          <Header currentTab = {this.state.currentTab} />
          <Content key={this.state.currentTab} currentTab={this.state.currentTab}/>
          <Navbar changeTab={this.tabChanged} currentTab={this.state.currentTab}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f6f8f9',
  }
});
