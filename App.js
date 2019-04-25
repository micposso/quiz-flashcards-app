import React from "react";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "expo";
import { Container, Spinner } from "native-base";
import store from "./reducers/store";
import { setLocalNotification } from "./utils/helper";
import { appStyles, colors } from "./utils/Styles";
import { fonts } from "./utils/fonts";

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
      return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
