import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Container, Content, Text, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";
import { colors } from "../utils/colors";

class Home extends React.Component {
  state = {
    decks: null
  };

  onButtonPress() {
    this.props.navigation.navigate("Details");
  }

  onDeckCardPress(deck) {
    this.props.navigation.navigate("Deck", {
      deckId: deck.id,
      title: deck.title
    });
  }

  render() {
    const { decks } = this.props;
    return (
      <Container>
        <Content style={styles.content} padder>
          {decks &&
            Object.keys(decks).map(id => (
              <TouchableOpacity
                key={id}
                onPress={() => this.onDeckCardPress(decks[id])}
              >
                <Card bordered>
                  <CardItem
                    header
                    style={{ justifyContent: "center", backgroundColor: colors.contentBackgroundColor }}
                  >
                    <Text>{decks[id].title}</Text>
                  </CardItem>
                  <CardItem style={{ justifyContent: "center", backgroundColor: colors.contentBackgroundColor }}>
                    <Body style={{ alignItems: "center" }}>
                      <Text>{decks[id].questions.length} cards</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Home);
