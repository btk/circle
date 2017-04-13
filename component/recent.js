import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';

function getSize() {
    return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
  }

export default class App extends React.Component {
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={false}
        style={styles.scrollView}>
          <Text>It would certainly be more satisfactory to our speculative reason if
          it could solve these problems for itself without this circuit and
          preserve the solution for practical use as a thing to be referred
          to, but in fact our faculty of speculation is not so well provided.
          Those who boast of such high knowledge ought not to keep it back,
          but to exhibit it publicly that it may be tested and appreciated. They
          want to prove: very good, let them prove; and the critical
          philosophy lays its arms at their feet as the victors. Quid statis?
          Nolint. Atqui licet esse beatis. As they then do not in fact choose to
          do so, probably because they cannot, we must take up these arms
          again in order to seek in the mortal use of reason, and to base on
          this, the notions of God, freedom, and immortality, the possibility of
          which speculation cannot adequately prove.</Text>

          <Text>Here first is explained the enigma of the critical philosophy, viz.:
          how we deny objective reality to the supersensible use of the
          categories in speculation and yet admit this reality with respect to
          the objects of pure practical reason. This must at first seem
          inconsistent as long as this practical use is only nominally known.
          But when, by a thorough analysis of it, one becomes aware that the
          reality spoken of does not imply any theoretical determination of
          the categories and extension of our knowledge to the supersensible;
          but that what is meant is that in this respect an object belongs to
          them, because either they are contained in the necessary determination
          of the will a priori, or are inseparably connected with its object;
          then this inconsistency disappears, because the use we make of these
          concepts is different from what speculative reason requires.</Text>

          <Text>little we cannot do in a host of co-operative ventures.
          Divided. . .there is little we can do. . .for we dare not meet
          a powerful challenge, at odds, and split asunder.
          To those new states whom we welcome to the ranks of the free:
          we pledge our word that one form of colonial control shall not
          have passed away merely to be replaced by a far more iron tyranny.
          We shall not always expect to find them supporting our view.
          But we shall always hope to find them strongly supporting their
          own freedom. . .and to remember that. . .in the past. . .those who
          foolishly sought power by riding the back of the tiger ended up inside.
          To those people in the huts and villages of half the globe
          struggling to break the bonds of mass misery: we pledge our best
          efforts to help them help themselves, for whatever period
          is required. . .not because the Communists may be doing it,
          not because we seek their votes, but because it is right.
          If a free society cannot help the many who are poor,
          it cannot save the few who are rich.</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex:1,
    backgroundColor: "red",
  }
});
