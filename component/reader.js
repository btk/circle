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

function makeid(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

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
      bookLoad: false,
      content: "",
      bookCoverUri: "",
      book: {},
      currentPage: 1
    };
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

  getPage(pageNum, length){
    let content = this.state.content;

    // word cut from page end
    let i = 0;
    while(1){
      if(content.substring(pageNum * length - 1 + i, pageNum * length + i) == " ") break;
      i++;
    }

    // word cut from page start
    let j = 0;
    if(pageNum != 1){
      while(1){
        if(content.substring((pageNum - 1) * length + j, (pageNum - 1) * length + 1 + j) == " ") break;
        j++;
      }
    }

    return content.substring((pageNum - 1) * length + j, pageNum * length + i).replace(" ", "")
      .split("\n\n")
      .map((p, i) => (<Text key={i} style={styles.paragraph}>{p.replaceAll('\n', " ")}</Text>));
  }

  renderSwiper(cp, length){
    console.log("swiper rendered", cp);
    let pages = [];
    if(parseInt(cp - 1) !== 0){
      pages.push(<View style={styles.swiperView} key={makeid(10)}>{this.getPage(cp - 1, length)}</View>);
    }
    pages.push(<View style={styles.swiperView} key={makeid(10)}>{this.getPage(cp, length)}</View>);
    pages.push(<View style={styles.swiperView} key={makeid(10)}>{this.getPage(cp + 1, length)}</View>);
    return (<ScrollView style={{height: 300}}>{pages}</ScrollView>);
  }

  pageChanged(changedToPageNumIndex){
    this.setState({currentPage: changedToPageNumIndex + 1});
    console.log(changedToPageNumIndex);
  }

  render() {
    let width = getSize().width;
    if(this.state.bookLoad){
      return( <View style={styles.readerCarrier}>
                <Header currentTab={this.state.book.title}
                        leftButton={() => { this.setState({currentPage: 4}); }}
                        rightButton={this.props.close.bind(this)}/>
                        {this.renderSwiper(this.state.currentPage, 1300)}
              </View>);
    }else{
      if(this.state.bookCoverUri){
        return(
          <View>
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
  swiperView: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  paragraph: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    lineHeight: 21,
    fontSize: 13,
    textAlign: 'justify'
  },
  chapter: {
    opacity: 0.7,
  }
});
