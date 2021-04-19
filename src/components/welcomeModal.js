import React from 'react';
import { connect } from 'react-redux';
import { changeVisibility } from '../actions';

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeWelcomeModal() {
    image.classList.remove('blurred');
    this.props.dispatch(
      changeVisibility({
        welcome: false,
        search: true,
        description: true,
        menu: true,
        dots: true,
      })
    );
    // welcome.style.display = 'none';
    // search.classList.remove('hidden');

    // description.classList.remove('hidden');
    // menubtn.classList.remove('hidden');
    // setTimeout(() => {
    //   dots.classList.remove('hidden');
    // }, 1000);

    // setTimeout(() => {
    //   downloadNextPosts(startUrl);
    // }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <p
          id="welcome"
          className={`welcome ${
            this.props.api.visibilityOfElements.welcomeModal ? '' : 'hidden'
          }`}
        >
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
            style={{ color: 'CHOCOLATE' }}
          >
            {' '}
            Tap here to start{' '}
          </strong>
          <br />
          <br />
        </p>
      </React.Fragment>
    );
  }
}

/*
          <a
            href="https://github.com/eslessons/kind-stranger-react"
            style={{ color: 'CHOCOLATE' }}
          >
            My GitHub Repository
          </a>

          */

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(WelcomeModal);
