import React from "react";
import { ThemeProvider, Badge, Text, Button, Card } from 'react-native-elements';
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
        type: 'outline',
        containerStyle: { marginBottom: 10 }
      },
      Badge: {
        status: 'warning',
      },
      Card: {
        containerStyle: {
          borderColor: '#ccc',
          borderRadius: 20,
        }
      }
    }

    if (deck) {
      return (
        <Container style={{ padding: 20 }}>
          <ThemeProvider theme={DeckScreen}>
            <Card>
              <View style={{ flex: 1, flexDirection: 'row', margin: 5, alignItems: 'center', justifyItems: 'center' }}>
                <Badge value={numberCards}/><Text h3>{deck.title}</Text>
              </View>
              <Text>Cards</Text>
              <View style={{ margin: 10 }}>
                
                <Button 
                  title="Add Card" 
                  onPress={() => this.onAddCardPress(deck.id)} 
                  icon={<Ionicons style={ appStyles.AppIcons } name="ios-add-circle-outline" />}
                />
              </View>
              <View style={{ margin: 10 }}>

              <Button 
                title="Start Quiz" 
                onPress={() => this.onStartQuizPress(deck.id)} 
                icon={<MaterialCommunityIcons style={ appStyles.AppIcons } name="test-tube-empty" />}
                />
               </View>
               <View style={{ margin: 10 }}>
 
              <Button 
                title="Remove Deck" 
                onPress={() => this.onDeleteDeckPress(deck.id)} 
                icon={<Ionicons style={ appStyles.AppIcons } name="ios-remove-circle-outline" />}
                />
                </View>
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
    deleteDeck: deckId => {
      dispatch(handleDeleteDeck(deckId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);


