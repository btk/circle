import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image, Animated, Easing } from 'react-native';

import * as EventManager from './../../js/event';
import * as Api from './../../js/api';

function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { bookCover: "" };
    this.event = EventManager.get();
    this.api = Api.get();
  }

  componentDidMount(){
    this.api.getBookCover(this.props.book.uniqid).then(coverImage => {
      this.setState({bookCover: coverImage});
    });
  }

  readBook = (bookHash) => {
    console.log(">< Reading book with id", bookHash);
    this.event.emit("reader", {bookHash});
  }

  render() {
    return (
      <View style={styles.bookView}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => this.readBook(this.props.book.uniqid)}>
          {(this.state.bookCover != "") &&
            <Image source={{uri: this.state.bookCover}} style={styles.bookCover}/>
          }
          <View style={styles.rightPane}>
            <Text style={styles.infoTitle}>{this.props.book.title}</Text>
            <Text style={styles.infoAuthor}>{this.props.book.author}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const bookCoverWidth = getSize().width * 0.25;
const styles = StyleSheet.create({
  bookView: {
    flex:1,
    height: bookCoverWidth * 1.54 + 20,
    borderWidth: 1,
    borderColor: '#f2f3f4',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 3,
    padding: 7,
  },
  touchableStyle: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  bookCover: {
    width: bookCoverWidth,
    height: bookCoverWidth * 1.54
  },
  rightPane: { marginHorizontal: 10},
  infoTitle: { fontSize: 16, marginVertical: 6, marginHorizontal: 3},
  infoAuthor: { fontSize: 12, color: '#777', marginHorizontal: 3},
});
