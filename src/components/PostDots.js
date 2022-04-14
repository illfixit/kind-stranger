import React from 'react';

export default class PostDots extends React.Component {
  constructor(props) {
    super(props);

    this.dotsVisibilityClass = 'hidden';
  }

  componentDidMount() {}

  componentWillUnmount() {}

  showDots(numberOfDots, active) {
    // console.log('showDots', numberOfDots, active);
    if (numberOfDots > 1) {
      return [...Array(numberOfDots)].map((e, i) => {
        if (i + 1 == active) {
          return (
            <span key={i} className="dot active">
              &#8226;
            </span>
          );
        }

        return (
          <span key={i} className="dot">
            &#8226;
          </span>
        );
      });
    }
  }

  render() {
    if (this.props.numberOfSubPosts > 1) {
      this.dotsVisibilityClass = 'visible';
    }

    return (
      <div id="dots" className={`dots ${this.dotsVisibilityClass}`}>
        {this.showDots(this.props.numberOfSubPosts, this.props.active)}
      </div>
    );
  }
}
