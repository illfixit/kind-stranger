import React from 'react';

export default class PostVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log(this.props);

    return (
      <video
        poster="./images/loader.gif"
        id="video"
        src={this.props.src}
        className={`video ${this.props.objectFitClass} ${this.props.videoVisibilityClass}`}
        autoPlay="autoplay"
        loop
        playsInline
        muted
      ></video>
    );
  }
}
