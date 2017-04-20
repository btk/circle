import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';
import * as Api from './../js/api';

import LibraryBookView from './views/library-bookview';

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
    this.state = { books: [] };
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

  render() {
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
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex:1,
  }
});
