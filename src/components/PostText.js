import React from 'react';

export default class PostText extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log(this.props);

    return (
      <div className={`selftext ${this.props.visibilityClass}`} id="selftext">
        <b>{this.props.title}</b>
        <br />
        <br />
        {this.props.selftext.length > 300
          ? `${this.props.selftext.slice(0, 300).replace('&amp', '&')}...`
          : this.props.selftext.slice(0, 300).replace('&amp', '&')}
      </div>
    );
  }
}
