import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Navigation from "./Navigation";
import Deck from "./Deck";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import { Entypo } from "@expo/vector-icons";
import { appStyles, colors } from "../utils/Styles";

const Back = ({ onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <Entypo name="back" />
  </TouchableHighlight>
);

const StackMenu = createStackNavigator({
  Main: {
    screen: Navigation,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primaryBlue
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primaryBlue
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.primaryBlue
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.primaryBlue
      },
    }
  }
});

export default createAppContainer(StackMenu);
