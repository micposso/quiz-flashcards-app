import React from "react";
import { View, StatusBar } from "react-native";
import { Container } from "native-base";
// import { Ionicons } from "@expo/vector-icons";
import Stack from "./StackNavigation";
import { Constants } from "expo";
import { connect } from "react-redux";
import { handleGetAllDecks } from "../actions/shared";
import { colors } from "../utils/colors";

class Main extends React.Component {
  componentDidMount() {
    this.props.initilizeData();
  }

  render() {
    return (
      <Container>
        <View style={{ height: Constants.statusBarHeight, backgroundColor: colors.allScreensBackgroundColor }}>
          <StatusBar />
        </View>
        <Stack />
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initilizeData: () => {
      dispatch(handleGetAllDecks());
    }
  };
}

export default connect(null, mapDispatchToProps)(Main);
