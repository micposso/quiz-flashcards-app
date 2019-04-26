import React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { ThemeProvider, Card, Input, Button, Text, Badge } from "react-native-elements";
import { Container, View } from "native-base";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../actions/shared";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";
import { appStyles, colors } from "../utils/Styles";

const QuizScreen = {
  Button: {
    raised: true,
    type: "outline",
    containerStyle: { marginTop: 15 }
  },
  Card: {
    containerStyle: {
      borderColor: "#ccc",
      borderRadius: 20,
    }
  },
  Badge: {
    badgeStyle: { height: 25, width: 25 }
  }
};

class Quiz extends React.Component {
  state = {
    questionIndex: 0,
    correctCount: 0,
    quizCompleted: false,
    flipButtonText: "Display Answer"
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
      this.setState({ flipButtonText: "Show Answer" });
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
      this.setState({ flipButtonText: "Show Question" });
    }
  }

  markQuestion(isCorrect) {
    this.setState((state, props) => {
      const updatedIndex = ++state.questionIndex;
      return {
        correctCount: isCorrect ? ++state.correctCount : state.correctCount,
        questionIndex: updatedIndex,
        quizCompleted: props.deck.questions.length === updatedIndex
      };
    });
    this.value = 180;
    this.flipCard();
  }

  restartQuiz() {
    this.setState({
      correctCount: 0,
      questionIndex: 0,
      quizCompleted: false
    });
    this.value = 180;
    this.flipCard();
  }

  setupNotificaitonForTomorrow() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { questions } = this.props.deck;
  
    if (this.state.quizCompleted) {
      this.setupNotificaitonForTomorrow();
      return this.renderWhenQuizCompleted();
      } else if (questions && questions.length) {
        return this.renderIfQuestionExists(questions);
      } else {
        return this.renderIfQuestionDoesNotExists();
      }
    };

  renderIfQuestionExists(questions) {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    const { questionIndex } = this.state;

    return (
      <Container>
        <ThemeProvider theme={QuizScreen}>
          <Card>
            <View styles={appStyles.centerAlign}>
                <Badge value={questionIndex + 1} />
                <Text h4>/</Text>
                <Badge value={questions.length} />
            </View>
            <Card>
              <Animated.View
                style={[
                  frontAnimatedStyle,
                  { opacity: this.frontOpacity }
                ]}
              >
                <Text h3>
                  {questions[questionIndex].question}
                </Text>
              </Animated.View>

              <Animated.View
                style={[
                  backAnimatedStyle,
                  { opacity: this.backOpacity }
                ]}
              >
                <Text h3>
                  {questions[questionIndex].answer}
                </Text>
              </Animated.View>
            </Card>

            <Button title={this.state.flipButtonText} onPress={() => this.flipCard()} />
            <Button title="Correct" onPress={() => this.markQuestion(true)} />
            <Button title="Incorrect" onPress={() => this.markQuestion(false)} />
          </Card>
        </ThemeProvider>
      </Container>
    );
  }

  renderIfQuestionDoesNotExists() {
    return (
      <Container>
        <ThemeProvider theme={QuizScreen}>
          <Card>
            <Text h3>
              You can't take this Quiz. Please add cards to the deck. 
            </Text>
          </Card>
          </ThemeProvider>
      </Container>
    );
  }

  renderWhenQuizCompleted() {
    return (
      <Container>
        <ThemeProvider theme={QuizScreen}>
          <Card>
            <Text h3>Quiz Completed</Text>
            <Text h3>
              You have answered{" "}
              {Math.round(
                (this.state.correctCount / this.props.deck.questions.length) * 100
              )}
              % correct
            </Text>
            <Button title="Restart Quiz" onPress={() => this.restartQuiz()} />
            <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
          </Card>
        </ThemeProvider>
      </Container>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);


