import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';

import LibraryBookView from './views/library-bookview';
import Notice from './views/notice';
import * as Api from './../js/api';
import * as EventManager from './../js/event';

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
    this.event = EventManager.get();
    this.state = { books: 'loading' };
  }

  /*
   * Get the books data when the component is mounted.
   */
  componentDidMount(){
    this.api.getMyBooks().then((myBooks) => {
      this.setState({
        books: myBooks
      });
    });
  }

  getNotice(){
    return (<Notice buttonText="+ Get Books" buttonAction={() => {this.event.emit("changeTab", "store")}}
                    bigText="Ups! Shelf is Empty"
                    subText="Dusty shelf has no book in it! You can get new books from book store for free!"
                    icon="shelf"/>);
  }
  getLoading(){
    return (<Text>Loading</Text>);
  }

  render() {
    if(this.state.books != 'loading'){
      if(this.state.books.length != 0){
        return (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={false}
            style={styles.scrollView}>
              {
                this.state.books.map((book, i) => (
                  <LibraryBookView key={i} book={book}/>
                ))
              }
          </ScrollView>
        );
      }else{
        return this.getNotice();
      }
    }else{
      return this.getLoading();
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex:1,
  }
});
