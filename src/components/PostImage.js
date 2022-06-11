import React from 'react';

export default class PostImage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}



  render() {
    return (
      <img
        id="image"
        src={this.props.src}
        className={`image ${this.props.imageVisibilityClass}`}
      />
    );
  }
}
