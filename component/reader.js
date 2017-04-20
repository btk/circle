import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, Image, View, Dimensions } from 'react-native';

import Header from './header';
import SvgUri from 'react-native-svg-uri';
import * as EventManager from './../js/event.js';
import * as Api from './../js/api.js';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


function getSize() {
  return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {bookLoad: false, content: "", bookCoverUri: "", book: {}};
    this.api = Api.get();
  }

  componentDidMount(){
    this.api.getBookByHash(this.props.bookHash).then(book => {
      this.setState({book});
    });

    this.api.getBookCover(this.props.bookHash).then(bookCoverUri => {
      this.setState({bookCoverUri});
    });

    this.api.getBookContent(this.props.bookHash).then(content => {
      this.setState({bookLoad: true, content: content})
    });
  }

  render() {
    let width = getSize().width;
    if(this.state.bookLoad){
      return( <View style={styles.readerCarrier}>
                <Header currentTab={this.state.book.title}
                        leftButton={this.props.close.bind(this)}
                        rightButton={this.props.close.bind(this)}/>
                <ScrollView style={styles.sv}>
                  {this.state.content.split("\n\n").map((p, i) => (
                    <Text style={[styles.paragraph, p.includes("CHAPTER")?styles.chapter:{}]} key={i}>{
                      p.replaceAll('\n', "")
                    }</Text>
                  ))}
                </ScrollView>
              </View>);
    }else{
      if(this.state.bookCoverUri){
        return(<View>
            <Image source={{uri: this.state.bookCoverUri, width: getSize().width, height: getSize().height}}
                   width={getSize().width}
                   height={getSize().height}
                   resizeMode="cover"/>
          </View>);
      }else{
        return(null);
      }
    }

  }
}

const styles = StyleSheet.create({
  readerCarrier: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left:0,
    width: getSize().width,
    height: getSize().height,
  },
  sv: {
    paddingVertical: 10,
    width: getSize().width,
    height: getSize().height,
  },
  paragraph: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    lineHeight: 21,
    fontSize: 13
  },
  chapter: {
    opacity: 0.7,
  }
});
