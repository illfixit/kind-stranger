import React from 'react';

export default class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeWelcomeModal() {
    welcome.style.display = 'none';
    search.classList.remove('hidden');
    image.classList.remove('blurred');
    description.classList.remove('hidden');
    menubtn.classList.remove('hidden');
    setTimeout(() => {
      dots.classList.remove('hidden');
    }, 1000);

    // setTimeout(() => {
    //   downloadNextPosts(startUrl);
    // }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <p id="welcome" className="welcome">
          <br />
          Welcome to my Reddit viewer... <br />
          <strong>Kind Stranger (React Edition)</strong>
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
          <strong
            onClick={() => {
              this.closeWelcomeModal();
            }}
          >
            {' '}
            Tap here to start{' '}
          </strong>
          <br />
          <br />
          <a
            href="https://github.com/eslessons/kind-stranger-react"
            style={{ color: 'CHOCOLATE' }}
          >
            My GitHub Repository
          </a>
        </p>
      </React.Fragment>
    );
  }
}
