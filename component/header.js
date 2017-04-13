import React from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

import SvgUri from 'react-native-svg-uri';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: this.props.currentTab,
      textAnim: new Animated.Value(0)
    };
    this.animateText(0.9);
  }

  /*
   * Animate the component when new props are arrived.
   * newProps {object}: object of new (updated) props.
   */
  componentWillReceiveProps(newProps){
    this.animateText(0);
    setTimeout(() => {
      this.setState({
        tab: newProps.currentTab
      });
      this.animateText(0.9);
    }, 300);
  }

  /*
   * Start the timing animation for text
   * toVal {bool}: animate endpoints of animation
   */
  animateText(toVal){
    Animated.timing(
      this.state.textAnim,
      {
        toValue: toVal,
        duration: 300,
        useNativeDriver: true
      },
    ).start();
  }

  /*
   * Map the visual text to relative tabs
   * tab {string}: slug of string that will be looked up.
   */
  currentTabMap(tab){
    switch (tab) {
      case "store":
        return "Book Store"
        break;
      case "recent":
        return "Recent Books"
        break;
      case "library":
        return "Library"
        break;
      case "profile":
        return "My Profile"
        break;
      default:
    }
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Animated.Text style={[styles.currentTabText, { opacity: this.state.textAnim }]}>
            {this.currentTabMap(this.state.tab)}
          </Animated.Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height:60,
    paddingTop:20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f5',
    backgroundColor: '#fff',
  },
  currentTabText: {
    lineHeight: 38
  }
});
