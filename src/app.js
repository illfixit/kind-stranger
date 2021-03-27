import React from 'react';
import ReactDOM from 'react-dom';

import WelcomeModal from './components/WelcomeModal.js';
import Menu from './components/Menu.js';
import Post from './components/Post.js';
import SearchPanel from './components/SearchPanel.js';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <WelcomeModal />
        <Menu />
        <Post />
        <SearchPanel />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
