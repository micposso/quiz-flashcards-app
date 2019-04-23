import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home";
import AddDeck from "./AddDeck";
import { colors } from "../utils/colors";

const Navigation = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Decks"
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "+Deck"
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontWeight: "bold"
      },
      style: {
        backgroundColor: colors.headerColor
      }
    }
  }
);
Navigation.navigationOptions = {
  header: null
};

export default Navigation;
