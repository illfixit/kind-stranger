import React from 'react';
import PostDots from './PostDots';
import PostTitle from './PostTitle';

export default class PostInfo extends React.Component {
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
    let imagePreview = null;
    let viewportAspectRatio = Math.round(window.innerWidth * 100 / window.innerHeight) / 100
    // console.log(viewportAspectRatio)
    // console.log('imageSize[0]', this.props.imageSize[0])
    // console.log('imageSize[1]', this.props.imageSize[1])
    if (this.props.imageSize[0] * 1.5 > this.props.imageSize[1]/viewportAspectRatio) {
      imagePreview = <img src={this.props.imageSource} id='imagePreview' />;
    }

    return (
      // TODO: Change name of class and id 
      <div className="titleAndDots" id="titleAndDots">

        <div id="previewContainer">
          {imagePreview}
          <div id="previewRectangle"> 
          </div>
        </div>


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
