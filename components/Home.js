import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemeProvider, Card, Text, Badge } from 'react-native-elements';
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
        title: 'STUDY DECK',
        containerStyle: {
          borderColor: '#ccc',
          borderRadius: 20,
        }
      },
      Badge: {
        badgeStyle: {height: 25, width: 25},
      }
    }
    return (
      <Container>
        <ThemeProvider theme={homeScreen}>
          <Content padder style={{ backgroundColor: colors.screensBg }}>
            {decks &&
              Object.keys(decks).map(id => {
                
                const numberCards = decks[id].questions.length;

                return (<TouchableOpacity
                  key={id}
                  onPress={() => this.onDeckCardPress(decks[id])}
                >
                  <Card>
                    <Text h1>{decks[id].title}</Text>
                    <Badge value={numberCards}/>
                  </Card>
                </TouchableOpacity>)
              
              
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
