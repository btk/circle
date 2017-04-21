import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';

import SvgUri from 'react-native-svg-uri';
import Search from './views/search';

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
      case "library":
        return "Your Books"
        break;
      default:
        return tab
    }
  }

  render() {
    if(this.state.tab == "store"){
      return(<View>
              <View style={styles.header}>
                <Animated.View style={{opacity: this.state.textAnim, flex: 1}}><Search /></Animated.View>
              </View>
            </View>);
    }else{
      return (
        <View>
          <View style={styles.header}>
          {this.props.leftButton &&
          <TouchableOpacity style={styles.touchableButton} onPress={this.props.leftButton}>
            <View style={styles.button}>
            <SvgUri
              width="20"
              height="20"
              style={{marginTop: 2}}
              source={require('./../svg/back.svg')}/>
            </View>
          </TouchableOpacity>}
            <Animated.Text style={[styles.currentTabText, { opacity: this.state.textAnim }]}>
              {this.currentTabMap(this.state.tab)}
            </Animated.Text>
            {this.props.rightButton &&
            <TouchableOpacity style={styles.touchableButton} onPress={this.props.rightButton}>
              <View style={styles.button}>
              <SvgUri
                width="20"
                height="20"
                source={require('./../svg/settings.svg')}/>
              </View>
            </TouchableOpacity>}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f5',
    backgroundColor: '#fff',
  },
  currentTabText: {
    flex: 1,
    lineHeight: 39,
    textAlign: 'center'
  },
  touchableButton: {
      height: 40,
      width: 40,
  },
  button:{
    height: 20,
    width: 20,
    padding: 10,
    opacity: 0.6
  }
});
