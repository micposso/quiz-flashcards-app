import React from "react";
import { TouchableHighlight } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Navigation from "./Navigation";
import Deck from "./Deck";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import { AntDesign } from "@expo/vector-icons";
import { appStyles, colors } from "../utils/Styles";

const Back = ({ onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <AntDesign name="leftcircle" color="white" size={30} style={{ marginLeft: 20 }} />
  </TouchableHighlight>
);

const StackMenu = createStackNavigator(
  {
    Main: {
      screen: Navigation
    },
    Deck: {
      screen: Deck
    },
    AddCard: {
      screen: AddCard
    },
    Quiz: {
      screen: Quiz
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
      headerLeft: <Back />,
      headerStyle: {
        backgroundColor: colors.headerColor
      }
    }
  }
);

export default createAppContainer(StackMenu);
