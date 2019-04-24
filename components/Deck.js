import React from "react";
import { ThemeProvider, Badge, Text, Button } from 'react-native-elements';
import { Container } from "native-base";
import { connect } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { handleDeleteDeck } from "../actions/shared";
import { colors } from "../utils/colors";


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

  onDeleteDeckPress(id) {
    this.props.deleteDeck(id);
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
      },
      Badge: {
        status: 'warning',
      }
    }

    if (deck) {
      return (
        <Container>
          <ThemeProvider theme={DeckScreen}>
            <Badge value={numberCards}/><Text h3>{deck.title}</Text>
            <Text>Cards</Text>
            <Button 
              title="Add Card" 
              onPress={() => this.onAddCardPress(deck.id)} 
              icon={<Ionicons name="ios-add-circle-outline" color="white" />}
            />
            <Button 
              title="Start Quiz" 
              onPress={() => this.onStartQuizPress(deck.id)} 
              icon={<MaterialCommunityIcons name="test-tube-empty" color="white" />}
              />
            <Button 
              title="Remove Deck" 
              onPress={() => this.onDeleteDeckPress(deck.id)} 
              icon={<Ionicons name="ios-remove-circle-outline" color="white" />}
              />
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
    deleteDeck: deckId => {
      dispatch(handleDeleteDeck(deckId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);


