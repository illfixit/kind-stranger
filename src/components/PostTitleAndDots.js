import React from 'react';
import PostDots from './PostDots';
import PostTitle from './PostTitle';

export default class PostTitleAndDots extends React.Component {
  constructor(props) {
    super(props);
    // this.bottom = '55px';
    // this.titleElement = document.getElementById('title');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log(this.props);
    // if (this.titleElement) {
    //   this.bottom = window
    //     .getComputedStyle(this.titleElement, null)
    //     .getPropertyValue('height');
    // }

    return (
      <div className="titleAndDots" id="titleAndDots">
        <PostDots
          numberOfSubPosts={this.props.numberOfSubPosts}
          active={this.props.active}
          // bottom={this.bottom}
        />
        <PostTitle
          titleVisibilityClass={this.props.titleVisibilityClass}
          title={this.props.title}
        />
      </div>
    );
  }
}
