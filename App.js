import React from "react";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "expo";
import { Container, Spinner } from "native-base";
import store from "./reducers/store";
import { setLocalNotification } from "./utils/helper";
import { colors } from "./utils/colors";

export default class App extends React.Component {
  state = {
    isAppReady: false
  };

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

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    if (!this.state.isAppReady) {
      return (
        <Container
          style={{
            felx: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.allScreensBackgroundColor
          }}
        >
          <Spinner color="white" />
        </Container>
      );
    }
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
