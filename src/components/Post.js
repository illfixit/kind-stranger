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
import { getPostInfo } from '../utils';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.handleDoubleTap = this.handleDoubleTap.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchNextPost());
    document.addEventListener('keydown', this.handleKeyboard, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard, false);
  }

  onSwipeDown(position, event) {
    if (this.props.api.currentSubreddit.previousPosts.length > 1) {
      this.props.dispatch(showPreviousPost());
    }
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
  }

  handleDoubleTap(e) {
    this.props.dispatch(changeMediaScale());
    // if (image.style.objectFit != 'contain') {
    //   image.style.objectFit = 'contain';
    //   video.style.objectFit = 'contain';
    // } else {
    //   image.style.objectFit = 'cover';
    //   video.style.objectFit = 'cover';
    // }
  }

  render() {
    // if (post && post.crosspost_parent != null)
    //   post = post.crosspost_parent_list[0];
    // console.log(this.props.api.currentSubreddit.currentPost[1]);
    let imageSource = null;
    let videoSource = null;
    let title = null;
    let numberOfSubPosts = 0;
    let active;

    // console.log('render', this.props.api.currentSubreddit);
    try {
      if (this.props.api.currentSubreddit.currentPost[0]) {
        numberOfSubPosts =
          this.props.api.currentSubreddit.currentPost.length - 1;

        active = this.props.api.currentSubreddit.currentPost[0].active;

        let post = this.props.api.currentSubreddit.currentPost[active];

        let postObject = getPostInfo(post);
        videoSource = postObject.videoSource;
        if (videoSource) {
          image.classList.add('hidden');
          video.classList.remove('hidden');
        } else {
          video.classList.add('hidden');
          image.classList.remove('hidden');
          imageSource = postObject.imageSource;
        }
        title = postObject.title;

        // console.log(imageSource, videoSource, title);

        // imageSource = post.preview
        //   ? post.preview.images[0].resolutions[
        //       post.preview.images[0].resolutions.length - 1
        //     ].url.replace(/amp;/gi, '')
        //   : '';

        // if (post.url && post.url.includes('redd') && post.url.includes('.gif'))
        //   imageSource = post.url;
        // video.classList.add('hidden');

        // if (post.url && post.url.includes('gfycat'))
        //   imageSource = post.secure_media.oembed.thumbnail_url;
        // video.classList.add('hidden');

        // if (
        //   post.url &&
        //   post.url.endsWith('.gifv') &&
        //   !post.url.includes('redd')
        // ) {
        //   videoSource = post.url.replace('gifv', 'mp4');
        //   video.classList.remove('hidden');
        // }
        // if (
        //   post.url &&
        //   post.url.endsWith('.gif') &&
        //   !post.url.includes('redd')
        // ) {
        //   videoSource = post.url.replace('gif', 'mp4');
        //   video.classList.remove('hidden');
        // }

        // if (post.media && post.media.reddit_video != null) {
        //   videoSource = post.media.reddit_video.fallback_url;
        //   video.classList.remove('hidden');
        // }

        // if (post.url && post.url.includes('redgif')) {
        //   videoSource = post.preview.reddit_video_preview.fallback_url;
        //   video.classList.remove('hidden');
        // }

        // title = post.title;
      }
    } catch (e) {
      console.log(e, 'not good in render');
      // this.props.dispatch(fetchNextPost());
      // let { url, sort, after } = this.props.api.currentSubreddit;
      // this.props.dispatch(fetchNextPost(url, sort, after));
      // this.props.dispatch(showNextPost());
    }

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
            src={imageSource ? imageSource : './images/loader.gif'}
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
            src={videoSource ? videoSource : ''}
            style={{
              objectFit: this.props.api.visibilityOfElements.objectFit,
            }}
            className={`video ${
              this.props.api.visibilityOfElements.video ? '' : 'hidden'
            }`}
            // preload="auto"
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
              numberOfSubPosts={numberOfSubPosts}
              active={active}
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
                {title}
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
