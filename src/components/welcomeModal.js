import React from 'react';
import { connect } from 'react-redux';
import { changeVisibility, prefetchPostsInCurrentSubreddit } from '../actions';

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeWelcomeModal() {
    this.props.dispatch(
      prefetchPostsInCurrentSubreddit(this.props.api.currentSubreddit.url)
    );

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
          To navigate between posts:
          <br />
          <strong>Use up-down swipes or keys</strong>
          <br />
          <br />
          If post has <strong>multiple images</strong>
          <br />
          (you'll see white dots)
          <br />
          you can swipe left-right <br />
          or press left-right keys
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
            href="https://github.com/illfixit/kind-stranger-react"
            style={{ color: 'CHOCOLATE' }}
          >
            My GitHub Repository
          </a>
          <br />
          <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Build: 0.9.1</span>
        </p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(WelcomeModal);
