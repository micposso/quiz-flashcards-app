import React from "react";
import { StyleSheet } from "react-native";
import { Container, Button, Text, Item, Input, Form } from "native-base";
import { connect } from "react-redux";
import { handleAddCardToDeck } from "../actions/shared";
import { colors } from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:colors.allScreensBackgroundColor,
  },
  cardInputField: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
  },
  button: {
    margin: 30,
    backgroundColor: colors.contentBackgroundColor,
  }
});

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
    return (
      <Container style={styles.container}>
        <Form style={{ alignSelf: "stretch" }}>
          <Item style={styles.cardInputField}>
            <Input
              placeholder="Question"
              onChangeText={this.handleChange("question")}
            />
          </Item>

          <Item style={styles.cardInputField}>
            <Input
              rounded
              placeholder="Answer"
              onChangeText={this.handleChange("answer")}
            />
          </Item>
        </Form>
        <Button style={styles.button} onPress={() => this.onAddCardPress()} block rounded>
          <Text>Submit</Text>
        </Button>
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

export default connect(null, mapDispatchToProps)(AddCard);


