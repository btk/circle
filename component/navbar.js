import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';

import SvgUri from 'react-native-svg-uri';
import RNFS from 'react-native-fs';


function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { tab: this.props.currentTab};
  }

  /*
   * Animate the component when new props are arrived.
   * newProps {object}: object of new (updated) props.
   */
  componentWillReceiveProps(newProps){
    this.setState({
      tab: newProps.currentTab
    });
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => this.props.changeTab('store')}
          style={styles.navbarItemTouch}>
          <View style={[styles.navbarItem, {opacity: (this.state.tab == 'store')? 1 : 0.4 }]}>
            <SvgUri
              width="20"
              height="20"
              source={require('./../svg/map.svg')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.changeTab('recent')}
          style={styles.navbarItemTouch}>
          <View style={[styles.navbarItem, {opacity: (this.state.tab == 'recent')? 1 : 0.4 }]}>
            <SvgUri
              width="20"
              height="20"
              source={require('./../svg/add.svg')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.changeTab('library')}
          style={styles.navbarItemTouch}>
          <View style={[styles.navbarItem, {opacity: (this.state.tab == 'library')? 1 : 0.4 }]}>
            <SvgUri
              width="20"
              height="20"
              source={require('./../svg/chat.svg')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.changeTab('profile')}
          style={styles.navbarItemTouch}>
          <View style={[styles.navbarItem, {opacity: (this.state.tab == 'profile')? 1 : 0.4 }]}>
            <SvgUri
              width="20"
              height="20"
              source={require('./../svg/user.svg')}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f5',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left:0,
    height:40,
    width: getSize().width,
    paddingHorizontal: getSize().width * 0.08,
  },
  navbarItemTouch: {
    flex: 1,
    alignItems: 'center',
  },
  navbarItem: {
    flex: 1,
    alignItems: 'center',
    padding:10
  }
});
