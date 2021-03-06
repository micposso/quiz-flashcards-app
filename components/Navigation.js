import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Home from "./Home";
import AddDeck from "./AddDeck";
import { Ionicons } from "@expo/vector-icons";
import { appStyles, colors } from "../utils/Styles";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Decks",
        tabBarIcon: () => <Ionicons name="md-home" size={20} color="white" />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: "Add Deck",
        tabBarIcon: () => <Ionicons name="md-paper" size={20} color="white" />
      }
    }
  },
  {
    barStyle: { backgroundColor: colors.primaryBlue }
  }
);
TabNavigator.navigationOptions = {
  header: null
};

export default TabNavigator;
