import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from './component/header';
import Navbar from './component/navbar';
import Content from './component/content';

import SvgUri from 'react-native-svg-uri';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.defaultTab = 'store';
    this.state = { currentTab: this.defaultTab };
  }

  tabChanged = (tab) => {
      console.log("Tab Changed To: ", tab);
      this.setState({
        currentTab: tab
      });
  }
  render() {
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

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f6f8f9',
  }
});
