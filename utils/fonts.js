import React from "react";
import { appStyles, colors } from "./Styles";
import { Container } from "native-base";
import { Font } from "expo";

class Fonts extends React.Component {
  async componentWillMount() {
    await Font.loadAsync({
      Foundation: require("native-base/Fonts/Foundation.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({
      isAppReady: true
    });
  }

  render() {
    <Container
      style={{
        felx: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.screensBg
      }}
    >
      <Spinner color="white" />
    </Container>;
  }
}

export default Fonts