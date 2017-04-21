import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from './component/header';
import Navbar from './component/navbar';
import Content from './component/content';
import Reader from './component/reader';
import * as Api from './js/api';
import * as EventManager from './js/event';

import SvgUri from 'react-native-svg-uri';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.defaultTab = 'library';
    this.state = {
      currentTab: this.defaultTab,
      readerStatus: false,
      currentBookHash: 0
    };

    Api.store();
    this.api = Api.get();
    EventManager.store();
    this.event = EventManager.get();
  }

  componentDidMount(){
    this.event.on('reader', (data) => {
      if (data.bookHash) {
        this.setState({
          readerStatus: true,
          currentBookHash: data.bookHash
        });
      }
    });
    this.event.on('changeTab', (tab) => {
      if (tab) {
        this.tabChanged(tab);
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
          <Reader close={this.closeReader.bind(this)} bookHash={this.state.currentBookHash}/>
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
