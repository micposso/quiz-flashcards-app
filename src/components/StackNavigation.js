import { createStackNavigator, createAppContainer } from "react-navigation";
import Navigation from "./Navigation";
import Deck from "./Deck";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import { colors } from "../utils/colors";

const Stack = createStackNavigator({
  Main: {
    screen: Navigation
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.headerColor
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.headerColor
      }
    }
  }
});

export default createAppContainer(Stack);
