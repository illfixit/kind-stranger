import React from 'react';

export default class Dots extends React.Component {
  constructor(props) {
    super(props);
  }

  showDots(numberOfDots, active) {
    // console.log('showDots', numberOfDots, active);
    if (numberOfDots > 0) {
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

  // calculateOffset() {
  //   if (this.props.numberOfSubPosts > 1) {
  //     return `${this.props.bottom + 5}px`;
  //   } else {
  //     return `${this.props.bottom - 100}px`;
  //   }
  // }

  toggleHidden() {
    if (this.props.numberOfSubPosts > 1) {
      return 'dots';
    } else {
      return 'dots hidden';
    }
  }

  render() {
    return (
      <div id="dots" className={this.toggleHidden()}>
        {this.showDots(this.props.numberOfSubPosts, this.props.active)}
      </div>
    );
  }
}
