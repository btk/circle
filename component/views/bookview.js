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
    this.state = {
      tab: this.props.currentTab,
      bookAnim: new Animated.Value(0)
    };
    this.animateBook(0);

  }

  /*
   * Animate the component when new props are arrived.
   * newProps {object}: object of new (updated) props.
   */
  componentWillReceiveProps(newProps){
    this.setState({
      tab: newProps.currentTab
    });
    this.animateBook(0);
  }

  bookPressed = (toVal) => {
    console.log("book pressed", this.props.book.id);
    this.props.openViewNotifier();
    setTimeout(() => this.animateBook(toVal), 10);
  }


  animateBook(toVal){
    Animated.timing(
      this.state.bookAnim,
      {
        toValue: toVal,
        duration: 500,
        useNativeDriver: true
      },
    ).start();
  }


  render() {
    const imgWidth = Math.floor((Math.floor(getSize().width / 2 - 20) - 16) * 1.54);
    const bookImageAnim = {
      transform: [{perspective:  imgWidth * 2}, {
        rotateY: this.state.bookAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'],
        })
      }, {
        translateX: this.state.bookAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -imgWidth * 0.08],
        })
      }]
    };
    const animatedOpening = {
      opacity: this.state.bookAnim,
      transform: [{
        scale: this.state.bookAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.00000001, 1],
        })
      }]
    };
    const infoAnim = {
      transform: [{
        translateY: this.state.bookAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 140],
        })
      }]
    };

    return (
      <View style={styles.bookView}>
        <TouchableOpacity onPress={() => this.bookPressed(1)}>
          <Animated.Image source={this.props.book.cover} style={[styles.bookViewImage, bookImageAnim]}/>
          <Animated.View style={[styles.infoCarrier, infoAnim]}>
            <Text style={styles.title}>{this.props.book.title}</Text>
            <Text style={styles.author}>{this.props.book.author}</Text>
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={[animatedOpening, styles.openView]}>
            <TouchableOpacity style={styles.bookExtra} onPress={() => this.bookPressed(0)}>
              <Text style={styles.infoTitle}>{this.props.book.title}</Text>
              <Text style={styles.infoAuthor}>{this.props.book.author}</Text>
              <View style={styles.metric}>
                <Text style={styles.plot}>During the year 1866, ships of several nations spot a mysterious sea monster, which some suggest to be a giant narwhal. The United States government assembles an expedition in New York City to find and destroy the monster. </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.pages}>{this.props.book.page} Pages & Free</Text>
            <TouchableOpacity style={styles.download} onPress={() => this.bookPressed(0)}>
              <Text style={styles.buttonText}>+ Add to Library</Text>
            </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const bookViewWidth = Math.floor(getSize().width / 2 - 20);

const styles = StyleSheet.create({
  bookView: {
    borderWidth: 1,
    borderColor: '#f2f3f4',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 3,
    padding: 7,
    width: bookViewWidth,
    height: bookViewWidth + 140,
    overflow: 'hidden',
  },
  openView: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 7,
    width: bookViewWidth,
    height: bookViewWidth + 140,
    position: 'absolute',
    top:0,
    left:0,
    zIndex: 9999
  },
  bookViewImage: {
    width: bookViewWidth - 16,
    height: Math.floor((bookViewWidth - 16) * 1.54)
  },
  infoCarrier: {
  },
  title: { fontSize: 14, marginVertical: 6, marginHorizontal: 3},
  author: { fontSize: 11, color: '#777', marginHorizontal: 3},
  download: {
    width: bookViewWidth - 22,
    height: 30,
    backgroundColor: "#489154",
    position: 'absolute',
    margin: 10,
    bottom:10,
    overflow: 'hidden',
    borderRadius:3,
    left: 0
  },
  pages: {
    height: 15,
    position: 'absolute',
    bottom:50,
    width: bookViewWidth - 2,
    textAlign: 'center',
    fontSize: 12,
    color: '#489154'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30
  },
  bookExtra: { height: bookViewWidth + 120 },
  infoTitle: { fontSize: 16, marginVertical: 6, marginHorizontal: 3},
  infoAuthor: { fontSize: 12, color: '#777', marginVertical: 6, marginHorizontal: 3},
  metric: { marginHorizontal: 3, paddingVertical: 6, borderTopWidth: 1, borderTopColor: '#eee' },
  plot: { fontSize: 10, lineHeight: 14, color: '#555',  },

});
