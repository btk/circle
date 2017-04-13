import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image, Animated, Easing } from 'react-native';


function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <View style={styles.bookView}>
        <Image source={this.props.book.cover} style={styles.bookCover}/>
        <View>
          <Text>{this.props.book.title}</Text>
          <Text>{this.props.book.author}</Text>
        </View>
      </View>
    );
  }
}
const bookCoverWidth = getSize().width * 0.3;
const styles = StyleSheet.create({
  bookView: {
    flex:1,
    backgroundColor: '#fff',
    height: 200,
    alignItems: 'stretch',
    flexDirection: 'row',
    padding:10,
    marginVertical: 10,
  },
  bookCover: {

    width: bookCoverWidth,
    height: bookCoverWidth * 1.54
  }
});
