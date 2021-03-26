import React from 'react';
import ReactDOM from 'react-dom';

import WelcomeModal from './components/welcomeModal.js';

export default class App extends React.Component {
  render() {
    return <WelcomeModal />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
