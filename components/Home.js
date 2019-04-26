import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemeProvider, Card, Text, Badge } from "react-native-elements";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { appStyles, colors } from "../utils/Styles";

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
    const homeScreen = {
      Card: {
        title: "STUDY DECK",
        containerStyle: {
          borderColor: "#ccc",
          borderRadius: 10
        }
      },
      Badge: {
        badgeStyle: { height: 20, width: 20, marginRight: 5 }
      }
    };
    return (
      <Container>
        <ThemeProvider theme={homeScreen}>
          <Content padder style={{ backgroundColor: colors.screensBg }}>
            {decks &&
              Object.keys(decks).map(id => {
                const numberCards = decks[id].questions.length;

                return (
                  <TouchableOpacity
                    key={id}
                    onPress={() => this.onDeckCardPress(decks[id])}
                  >
                    <Card>
                      <View style={appStyles.centerAlign}>
                        <Text h1>{decks[id].title}</Text>
                      </View>
                      <View style={appStyles.centerAlign}>
                        <Badge value={numberCards} />
                        <Text h4>Cards</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </Content>
        </ThemeProvider>
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
