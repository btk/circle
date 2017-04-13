import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, Animated, Easing } from 'react-native';

import Store from './store';
import Recent from './recent';
import Library from './library';
import Profile from './profile';

function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: this.props.currentTab,
      contentAnim: new Animated.Value(0)
    };
    this.animateContent(1);
  }

  componentWillReceiveProps(newProps){
    this.animateContent(0);
    setTimeout(() => {
      this.setState({
        tab: newProps.currentTab
      });
      this.animateContent(0.9);
    }, 300);
  }

  animateContent(toVal){
    Animated.timing(
      this.state.contentAnim,
      {
        toValue: toVal,
        duration: 300,
        useNativeDriver: true
      },
    ).start();
  }

  renderTab = (currentTab) => {
    if(currentTab == "store"){
      return (<Store />);
    } else if(currentTab == "recent"){
      return (<Recent />);
    } else if(currentTab == "library"){
      return (<Library />);
    } else if(currentTab == "profile"){
      return (<Profile />);
    }
  }

  render() {
    const contentAnimation = {
      opacity: this.state.contentAnim,
      transform: [{
        scale: this.state.contentAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        })
      }]
    };
    return (
      <Animated.View style={[styles.contentCarrier, contentAnimation]}>
        {this.renderTab(this.state.tab)}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  contentCarrier: {
    height: Math.floor(getSize().height - 99),
    overflow: 'hidden',
  }
});
