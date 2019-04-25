import React from "react";
import { StyleSheet } from "react-native";
import { Container} from "native-base";
import { ThemeProvider, Card, Input, Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import { handleAddCardToDeck } from "../actions/shared";
import { Ionicons } from "@expo/vector-icons";
import { appStyles, colors } from "../utils/Styles";

class AddCard extends React.Component {
  onAddCardPress() {
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    this.props.addCardToDeck(deckId, {
      question,
      answer
    });
    this.props.navigation.goBack();
  }

  state = {
    question: "",
    answer: ""
  };

  handleChange = name => value => {
    this.setState({ [name]: value });
  };

  render() {
    const AddCard = {
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
    return (
      <Container>
        <ThemeProvider theme={AddCard}>
          <Card style={{ alignSelf: "stretch" }}>
            <Input
              placeholder="Type Question"
              onChangeText={this.handleChange("question")}
              leftIcon={
                <Ionicons
                  style={appStyles.AppIcons}
                  name="ios-add-circle-outline"
                />
              }
            />

            <Input
              placeholder="Type Answer"
              onChangeText={this.handleChange("answer")}
              leftIcon={
                <Ionicons
                  style={appStyles.AppIcons}
                  name="ios-add-circle-outline"
                />
              }
            />
            <Button
            title="Submit"
            onPress={() => this.onAddCardPress()}
          />
          </Card>
        </ThemeProvider>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deckId, card) => {
      dispatch(handleAddCardToDeck(deckId, card));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddCard);
