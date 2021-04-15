import React from 'react';
import { connect } from 'react-redux';
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
} from '../actions/index';
import Swipe from 'react-easy-swipe';
import { render } from 'react-dom';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  componentDidMount() {
    let { url, sort, after } = this.props.api.currentSubreddit;
    this.props.dispatch(fetchNextPost(url, sort, after));
  }

  onSwipeDown(position, event) {
    if (this.props.api.currentSubreddit.previousPosts.length > 1) {
      this.props.dispatch(showPreviousPost());
    }
  }

  onSwipeUp(position, event) {
    if (this.props.api.currentSubreddit.nextPosts.length === 0) {
      let { url, sort, after } = this.props.api.currentSubreddit;
      this.props.dispatch(fetchNextPost(url, sort, after));
    } else {
      this.props.dispatch(showNextPost());
    }
  }

  onSwipeLeft(position, event) {
    // console.log('onSwipeLeft', this.props.api.currentSubreddit.currentPost);
    let active = this.props.api.currentSubreddit.currentPost[0].active;

    if (active < this.props.api.currentSubreddit.currentPost.length - 1) {
      this.props.dispatch(showNextSubpost());
    }
  }

  onSwipeRight(position, event) {
    // console.log('onSwipeRight', this.props.api.currentSubreddit.currentPost);
    let active = this.props.api.currentSubreddit.currentPost[0].active;

    if (active > 1) {
      this.props.dispatch(showPreviousSubpost());
    }
  }

  render() {
    let imageSource = null;
    let title = null;

    try {
      if (this.props.api.currentSubreddit.currentPost[0]) {
        let active = this.props.api.currentSubreddit.currentPost[0].active;

        let post = this.props.api.currentSubreddit.currentPost[active];

        imageSource = post.preview
          ? post.preview.images[0].resolutions[
              post.preview.images[0].resolutions.length - 1
            ].url.replace(/amp;/gi, '')
          : '';

        title = post.title;
      }
    } catch (e) {
      console.log('not good');
    }

    return (
      <Swipe
        onSwipeDown={this.onSwipeDown}
        onSwipeUp={this.onSwipeUp}
        onSwipeRight={this.onSwipeRight}
        onSwipeLeft={this.onSwipeLeft}
        tolerance={100}
      >
        <img id="image" src={imageSource} className="image blurred" />
        <video
          poster="./images/loader.gif"
          id="video"
          src=""
          className="hidden"
          preload="auto"
          autoPlay="autoplay"
          loop
          playsInline
          muted
        ></video>
        <div className="description hidden" id="description">
          <a href="" id="a">
            <div className="title" id="title">
              {title}
            </div>
          </a>
        </div>
      </Swipe>
    );
  }
}

// if (post && post.crosspost_parent != null)
//   post = post.crosspost_parent_list[0];

// if (post.url && post.url.includes('redd') && post.url.includes('.gif'))
//   setSrc(image, post.url);

// if (post.url && post.url.endsWith('.gifv') && !post.url.includes('redd')) {
//   hide(image);
//   setSrc(video, post.url.replace('gifv', 'mp4'));
//   show(video);
// }
// if (post.url && post.url.endsWith('.gif') && !post.url.includes('redd')) {
//   hide(image);
//   setSrc(video, post.url.replace('gif', 'mp4'));
//   show(video);
// }

// if (post.media && post.media.reddit_video != null) {
//   hide(image);
//   setSrc(video, post.media.reddit_video.fallback_url);
//   show(video);
// } //  else {
// //   hide(video);
// // }

// if (post.url && post.url.includes('gfycat'))
//   setSrc(image, post.secure_media.oembed.thumbnail_url);

// if (post.url && post.url.includes('redgif')) {
//   hide(image);
//   setSrc(video, post.preview.reddit_video_preview.fallback_url);
//   show(video);
// }

const mapStateToProps = ({ api }) => {
  console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Post);
