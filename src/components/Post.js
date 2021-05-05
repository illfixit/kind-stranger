import React from 'react';
import { connect } from 'react-redux';
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
  changeMediaScale,
} from '../actions/index';
import Swipe from 'react-easy-swipe';
import Dots from './Dots';
import Hammer from 'rc-hammerjs';

class Post extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.imageSource = null;
    this.videoSource = null;
    this.title = null;
    this.numberOfSubPosts = 0;
    this.active;

    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.handleDoubleTap = this.handleDoubleTap.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.dispatch(fetchNextPost());
    document.addEventListener('keydown', this.handleKeyboard, false);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    try {
      if (this.props.api.currentSubreddit.currentPost[0]) {
        console.log('cp', this.props.api.currentSubreddit.currentPost[0]);
        this.numberOfSubPosts =
          this.props.api.currentSubreddit.currentPost.length - 1;

        this.active = this.props.api.currentSubreddit.currentPost[0].active;

        // console.log(this.active);
        let post = this.props.api.currentSubreddit.currentPost[this.active];
        console.log(post);
        this.imageSource = post.preview.images[0].resolutions[
          post.preview.images[0].resolutions.length - 1
        ].url.replace(/amp;/gi, '');

        if (post.url && post.url.includes('redd') && post.url.includes('.gif'))
          this.imageSource = post.url;
        video.classList.add('hidden');

        if (post.url && post.url.includes('gfycat'))
          this.imageSource = post.secure_media.oembed.thumbnail_url;
        video.classList.add('hidden');

        if (
          post.url &&
          post.url.endsWith('.gifv') &&
          !post.url.includes('redd')
        ) {
          videoSource = post.url.replace('gifv', 'mp4');
          video.classList.remove('hidden');
        }
        if (
          post.url &&
          post.url.endsWith('.gif') &&
          !post.url.includes('redd')
        ) {
          videoSource = post.url.replace('gif', 'mp4');
          video.classList.remove('hidden');
        }

        if (post.media && post.media.reddit_video != null) {
          videoSource = post.media.reddit_video.fallback_url;
          video.classList.remove('hidden');
        }

        if (post.url && post.url.includes('redgif')) {
          videoSource = post.preview.reddit_video_preview.fallback_url;
          video.classList.remove('hidden');
        }

        this.title = post.title;
      }
    } catch (e) {
      console.log(e, 'not good in render');
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    document.removeEventListener('keydown', this.handleKeyboard, false);
  }

  onSwipeDown(position, event) {
    if (this.props.api.currentSubreddit.previousPosts.length > 1) {
      this.props.dispatch(showPreviousPost());
    }
    this.forceUpdate();
  }

  onSwipeUp(position, event) {
    if (this.props.api.currentSubreddit.nextPosts.length === 0) {
      try {
        this.props.dispatch(fetchNextPost());
      } catch (e) {
        console.log('Post', e);
        this.props.dispatch(fetchNextPost());
      }
    } else {
      this.props.dispatch(showNextPost());
    }
    this.forceUpdate();
  }

  onSwipeLeft(position, event) {
    // console.log('onSwipeLeft', this.props.api.currentSubreddit.currentPost);
    let active = this.props.api.currentSubreddit.currentPost[0].active;

    if (active < this.props.api.currentSubreddit.currentPost.length - 1) {
      this.props.dispatch(showNextSubpost());
    }
    this.forceUpdate();
  }

  onSwipeRight(position, event) {
    // console.log('onSwipeRight', this.props.api.currentSubreddit.currentPost);
    let active = this.props.api.currentSubreddit.currentPost[0].active;

    if (active > 1) {
      this.props.dispatch(showPreviousSubpost());
    }
    this.forceUpdate();
  }

  handleKeyboard(e) {
    // console.log(e);
    if (e.key === 'ArrowDown') {
      if (this.props.api.currentSubreddit.nextPosts.length === 0) {
        try {
          this.props.dispatch(fetchNextPost());
        } catch (e) {
          console.log('Post', e);
          this.props.dispatch(fetchNextPost());
        }
      } else {
        this.props.dispatch(showNextPost());
      }
    } else if (e.key === 'ArrowUp') {
      if (this.props.api.currentSubreddit.previousPosts.length > 1) {
        this.props.dispatch(showPreviousPost());
      }
    } else if (e.key === 'ArrowLeft') {
      let active = this.props.api.currentSubreddit.currentPost[0].active;

      if (active > 1) {
        this.props.dispatch(showPreviousSubpost());
      }
    } else if (e.key === 'ArrowRight') {
      let active = this.props.api.currentSubreddit.currentPost[0].active;

      if (active < this.props.api.currentSubreddit.currentPost.length - 1) {
        this.props.dispatch(showNextSubpost());
      }
    }
    this.forceUpdate();
  }

  handleDoubleTap(e) {
    this.props.dispatch(changeMediaScale());
    this.forceUpdate();
    // if (image.style.objectFit != 'contain') {
    //   image.style.objectFit = 'contain';
    //   video.style.objectFit = 'contain';
    // } else {
    //   image.style.objectFit = 'cover';
    //   video.style.objectFit = 'cover';
    // }
  }

  render() {
    console.log('render');
    return (
      <Hammer onDoubleTap={this.handleDoubleTap}>
        <Swipe
          onSwipeDown={this.onSwipeDown}
          onSwipeUp={this.onSwipeUp}
          onSwipeRight={this.onSwipeRight}
          onSwipeLeft={this.onSwipeLeft}
          tolerance={50}
        >
          <img
            id="image"
            onDoubleClick={this.handleDoubleClick}
            onWheel={this.handleWheel}
            src={this.imageSource ? this.imageSource : './images/loader.gif'}
            style={{
              objectFit: this.props.api.visibilityOfElements.objectFit,
            }}
            className={`image blurred ${
              this.props.api.visibilityOfElements.image ? '' : 'hidden'
            }`}
          />

          <video
            poster="./images/loader.gif"
            id="video"
            src={this.videoSource ? this.videoSource : ''}
            style={{
              objectFit: this.props.api.visibilityOfElements.objectFit,
            }}
            className={`video ${
              this.props.api.visibilityOfElements.video ? '' : 'hidden'
            }`}
            preload="auto"
            autoPlay="autoplay"
            loop
            playsInline
            muted
          ></video>

          <div
            className={`description ${
              this.props.api.visibilityOfElements.description ? '' : 'hidden'
            }`}
            id="description"
          >
            <Dots
              numberOfSubPosts={this.numberOfSubPosts}
              active={this.active}
              // bottom={
              //   document.getElementById('description')
              //     ? document.getElementById('description').offsetHeight
              //     : 0
              // }
            />
            <a
              href={
                this.props.api.currentSubreddit.currentPost[1]
                  ? this.props.api.currentSubreddit.currentPost[1].url
                  : 'https://www.reddit.com'
              }
              id="a"
            >
              <div className="title" id="title">
                {this.title}
              </div>
            </a>
          </div>
        </Swipe>
      </Hammer>
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
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Post);
