import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import WelcomeModal from './components/WelcomeModal.js';
import Menu from './components/Menu.js';
import Post from './components/Post.js';
import SearchPanel from './components/SearchPanel.js';

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
        <Menu />
        <Post />
        <SearchPanel />
        <WelcomeModal />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
