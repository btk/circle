import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, Animated, Easing } from 'react-native';
import * as Api from './../js/api';
import * as EventManager from './../js/event';

import BookView from './views/bookview';
import Notice from './views/notice';

function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.api = Api.get();
    this.state = {
      books: 'loading',
      closeAll: true,
      searchAnim: new Animated.Value(1)
    };

    this.event = EventManager.get();
  }


  /*
   * Get the books data when the component is mounted.
   */
  componentWillMount(){
    this.getBookData();
  }

  componentDidMount(){
    this.event.on("search", (info) => {
      if(info.action == "focus") this.animateSearch(0.3);
      if(info.action == "blur") this.animateSearch(1);
    });
  }

  getBookData(){
    this.setState({books: 'loading'});
    this.api.getAllBooks().then((theBooks) => {
      this.setState({
        books: theBooks
      });
    });
  }

  animateSearch(toVal){
    Animated.timing(
      this.state.searchAnim,
      {
        toValue: toVal,
        duration: 300,
        useNativeDriver: true
      },
    ).start();
  }

  getNotice(){
    return (<Notice buttonText="Reload" buttonAction={this.getBookData.bind(this)}
                    bigText="No Internet Connection!"
                    subText="In order to visit and download books, you need internet connection!"
                    icon="internet"/>);
  }

  render() {
    if(this.state.books == 'loading'){
      return(<Text>Loading...</Text>);
    }else{
      if(this.state.books != 503){
        return (
          <Animated.ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={false}
            style={[styles.scrollView, {opacity: this.state.searchAnim}]}>
              <View style={styles.bookViewCarrier}>
                {this.state.books.map((book, i) => {
                  if(i < 10){
                  return (
                  <BookView key={i}
                            status={this.state.closeAll}
                            openViewNotifier={() => { this.setState({closeAll: true}) }}
                            book={book}/>
                )}})}
              </View>
          </Animated.ScrollView>
        );
      }else{
        return this.getNotice();
      }
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex:1
  },
  bookViewCarrier: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5
  }
});
