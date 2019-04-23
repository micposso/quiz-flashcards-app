import React from "react";
import { TouchableOpacity } from "react-native";
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
        <Content padder style={{ backgroundColor: colors.allScreensBackgroundColor }}>
          {decks &&
            Object.keys(decks).map(id => (
              <TouchableOpacity
                key={id}
                onPress={() => this.onDeckCardPress(decks[id])}
              >
                <Card bordered>
                  <CardItem
                    header
                    style={{ justifyContent: "center", flexDirection: "column", backgroundColor: colors.contentBackgroundColor }}
                  >
                    <Text>{decks[id].title}</Text>
                      <CardItem style={{ justifyContent: "center", marginTop: 10, backgroundColor: colors.contentBackgroundColor }}>
                        <Body style={{ alignItems: "center", padding: 10, borderColor: "#1678a5", borderWidth: 1, borderStyle: "solid"}} rounded>
                          <Text>{decks[id].questions.length} cards</Text>
                        </Body>
                    </CardItem>
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
