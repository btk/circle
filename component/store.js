import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';
import * as Api from './../js/api';

import BookView from './views/bookview';

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
    this.state = { books: [], closeAll: true };
  }


  /*
   * Get the books data when the component is mounted.
   */
  componentWillMount(){
    this.api.getAllBooks().then((myBooks) => {
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
          <View style={styles.bookViewCarrier}>
            {this.state.books.map((book, i) => {
              if(i < 4){
              return (
              <BookView key={i}
                        status={this.state.closeAll}
                        openViewNotifier={() => { this.setState({closeAll: true}) }}
                        book={book}/>
            )}})}
          </View>
      </ScrollView>
    );
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
