import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import TopPanel from "./components/TopPanel.js";
import Post from "./components/Post.js";

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
        <Post />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
