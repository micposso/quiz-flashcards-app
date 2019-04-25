import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Container } from "native-base";
import { ThemeProvider, Card, Input, Button, Text, Badge } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { handleAddDecks, resetNewDeckId } from "../actions/shared";
import { appStyles, colors } from "../utils/Styles";

class AddDeck extends React.Component {
  state = {
    deckTitle: "",
    message: ""
  };

  onAddCreateDeckPress() {
    if(this.state.deckTitle === "") {
      this.setState({ message: "Please type a deck name"})
    } else {
      this.props.addDeck(this.state.deckTitle);
    }
  }

  handleChange = name => value => {
    this.setState({ [name]: value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newDeckId !== this.props.newDeckId) {
      this.props.navigation.navigate("Deck", {
        deckId: nextProps.newDeckId,
        title: this.state.deckTitle
      });
      this.setState({ deckTitle: "" });
    }
  }

  render() {
    const AddDeck = {
      Button: {
        raised: true,
        type: "outline",
        containerStyle: { marginTop: 15 }
      },
      Card: {
        containerStyle: {
          borderColor: "#ccc",
          borderRadius: 20,
          height: 200
        }
      },
      Input: {}
    };
    const { deckTitle, message } = this.state;
    return (
      <Container padder style={{ backgroundColor: colors.screensBg }}>
        <ThemeProvider theme={AddDeck}>
          <KeyboardAvoidingView behavior="padding">
            <Card>
              <Text h3>What is the title of your new deck?</Text>
                  <Input
                    placeholder="Deck Title"
                    leftIcon={
                      <Ionicons
                        style={appStyles.AppIcons}
                        name="ios-add-circle-outline"
                      />
                    }
                    onChangeText={this.handleChange("deckTitle")}
                  />
                <Button title="Create Deck" onPress={() => this.onAddCreateDeckPress()} />
            </Card>
                  <Badge value={message} badgeStyle={{ backgroundColor: colors.screensBg, borderColor: colors.screensBg }}/>
          </KeyboardAvoidingView>
        </ThemeProvider>
      </Container>
    );
  }
}

function mapStateToProps({ newDeckId }) {
  return {
    newDeckId: newDeckId.newDeckId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deckTitle => {
      dispatch(handleAddDecks(deckTitle));
    },
    resetNewDeckId: () => {
      dispatch(resetNewDeckId());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck);

const styles = StyleSheet.create({
  selfAlign: {
    alignSelf: "center"
  },
  text1: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
    color: colors.mainTextColor
  },
  btn: {
    alignSelf: "center",
    backgroundColor: colors.darkButtonColor
  },
  container: {
    flex: 1,
    backgroundColor: colors.screensBg,
    alignItems: "center",
    justifyContent: "center"
  }
});
