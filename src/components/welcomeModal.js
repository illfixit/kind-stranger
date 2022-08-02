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
        <div
          id="welcome"
          className={`welcome ${
            this.props.api.visibilityOfElements.welcomeModal ? '' : 'hidden'
          }`}
          onClick={() => {
            this.closeWelcomeModal();
          }}
        >
          <p id="welcome-text" className="welcome-text">
            <br />
            Welcome to my Reddit viewer... <br />
            <strong>Kind Stranger</strong>
            <br />
            <br />
            Long tap to toggle between<br />
            <strong>Navigation mode</strong> (Zoomed out)<br />
            <strong>Cover mode</strong> (Zoomed in)<br />
            <br />
            Use swipes in <strong>Zoomed Out</strong> mode<br />
            to <strong>navigate</strong> between posts

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
              href="https://github.com/illfixit/kind-stranger"
              style={{ color: 'CHOCOLATE' }}
            >
              My GitHub Repository
            </a>
            <br />
            <br />
            <span
              style={{ color: 'rgba(150, 150, 150, 1)', marginTop: '0.5rem' }}
            >
              Build: 1.5.7
            </span>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(WelcomeModal);
