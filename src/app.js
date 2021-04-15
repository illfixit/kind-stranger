import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import WelcomeModal from './components/WelcomeModal.js';
import Menu from './components/Menu.js';
import Post from './components/Post.js';
import SearchPanel from './components/SearchPanel.js';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <WelcomeModal />
        <Menu />
        <Post />
        <SearchPanel />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
