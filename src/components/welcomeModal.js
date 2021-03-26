import React from 'react';

export default class WelcomeModal extends React.Component {
  render() {
    return (
      <div>
        <p id="welcome" className="welcome">
          <br />
          Welcome to my Reddit viewer... <br />
          <strong>Kind Stranger</strong>
          <br />
          <br />
          For mobile users:
          <br />
          <strong>Use swipes</strong>
          <br />
          <br />
          For desktop users:
          <br />
          <strong>Use mouse wheel</strong>
          <br />
          or arrow keys
          <br />
          <br />
          <strong>Tap twice</strong> to change the scale of images.
          <br />
          <br />
          <strong> Tap here to start </strong>
          <br />
          <br />
          <a
            href="https://github.com/eslessons/kind-stranger"
            style={{ color: 'CHOCOLATE' }}
          >
            My GitHub Repository
          </a>
        </p>
      </div>
    );
  }
}
