import React from "react";
import {
  ThemeProvider,
  Badge,
  Text,
  Button,
  Card
} from "react-native-elements";
import { Container, View } from "native-base";
import { connect } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { handleDeleteDeck } from "../actions/shared";
import { appStyles, colors } from "../utils/Styles";

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: title,
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.headerColor
      }
    };
  };

  onAddCardPress(id) {
    this.props.navigation.navigate("AddCard", {
      deckId: id
    });
  }

  onStartQuizPress(id) {
    this.props.navigation.navigate("Quiz", {
      deckId: id
    });
  }

  onRemoveDeck(id) {
    this.props.removeDeck(id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.deck) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { deck } = this.props;
    const numberCards = deck.questions.length;
    const DeckScreen = {
      Button: {
        raised: true,
        type: "outline",
        containerStyle: { marginBottom: 10 }
      },
      Badge: {
        status: "warning",
        badgeStyle: { height: 25, width: 25, marginTop: 40 }
      },
      Card: {
        title: "STUDY DECK",
        containerStyle: {
          borderColor: "#ccc",
          borderRadius: 20,
        }
      }
    };

    if (deck) {
      return (
        <Container padder style={{ backgroundColor: colors.screensBg }}>
          <ThemeProvider theme={DeckScreen}>
                <View>
                  <Badge value={numberCards} />
                </View>
            <Card>

                <Button
                  title="Add Card"
                  onPress={() => this.onAddCardPress(deck.id)}
                  icon={
                    <Ionicons
                      style={appStyles.AppIcons}
                      name="ios-add-circle-outline"
                    />
                  }
                />

                <Button
                  title="Start Quiz"
                  onPress={() => this.onStartQuizPress(deck.id)}
                  icon={
                    <MaterialCommunityIcons
                      style={appStyles.AppIcons}
                      name="test-tube-empty"
                    />
                  }
                />

                <Button
                  title="Remove Deck"
                  onPress={() => this.onRemoveDeck(deck.id)}
                  icon={
                    <Ionicons
                      style={appStyles.AppIcons}
                      name="ios-remove-circle-outline"
                    />
                  }
                />
            </Card>
          </ThemeProvider>
        </Container>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps({ decks }, props) {
  const { deckId } = props.navigation.state.params;
  return {
    deck: decks[deckId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeDeck: deckId => {
      dispatch(handleDeleteDeck(deckId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
