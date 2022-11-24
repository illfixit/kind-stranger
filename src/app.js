import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import Post from "./components/Post.js";
import TopPanel from "./components/TopPanel";

import SearchPanel from "./components/SearchPanel";
import SettingsPanel from "./components/SettingsPanel";

export default class App extends React.Component {
  componentDidMount() {
    // console.log('componentDidMount');
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }

  render() {
    return (
      <Provider store={store}>
        <TopPanel />
        <SearchPanel />
        <SettingsPanel />
        <Post />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
