import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
// import { createMaterialTopTabNavigator } from 'react-navigation';
import Home from './Home';
import AddDeck from './AddDeck';
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../utils/colors';

const TabNavigator = createMaterialBottomTabNavigator ({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Decks",
            tabBarIcon: () => <Ionicons name="md-home" size={20} color="white" />,
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: "Add Deck",
            tabBarIcon: () => <Ionicons name="md-paper" size={20} color="white" />,
        }
    }
})
TabNavigator.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
    
};

export default TabNavigator;
