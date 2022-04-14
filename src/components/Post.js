import React from 'react';
import { connect } from 'react-redux';
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
  changeMediaScale,
  changeSort,
  showComments,
} from '../actions/index';
import Swipe from 'react-easy-swipe';

import PostText from './PostText';
import PostImage from './PostImage';
import PostVideo from './PostVideo';
import PostTitleAndDots from './PostTitleAndDots';

import Comments from './Comments';
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
    this.changeSort = this.changeSort.bind(this);
    // this.showPostComments = this.showPostComments.bind(this);

    this.imageSource = '';
    this.imageVisibilityClass = 'hidden';

    this.videoSource = '';
    this.videoVisibilityClass = 'hidden';

    this.title = '';
    this.titleVisibilityClass = 'hidden';

    this.selftext = '';
    this.textVisibilityClass = 'hidden';

    this.objectFitClass = 'contain';
    this.numberOfSubPosts = 0;
    this.active;

    this.currentSortMethod = 'hot';
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

  handleDoubleTap(e) {
    if (this.objectFitClass !== 'cover') {
      this.props.dispatch(changeMediaScale('cover'));
    } else {
      this.props.dispatch(changeMediaScale('contain'));
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

  // showPostComments() {
  //   console.log('Show Comments');
  //   this.props.dispatch(showComments());
  // }

  changeSort(e) {
    let sortMethod = e.target.innerText.toLowerCase();
    console.log('changeSort', sortMethod);

    this.props.dispatch(changeSort(sortMethod));
    this.props.dispatch(fetchNextPost());
  }

  preparePost(currentPost) {
    if (currentPost != undefined) {
      try {
        if (currentPost[0]) {
          this.numberOfSubPosts = currentPost.length - 1;
          this.active = currentPost[0].active;

          let post = currentPost[this.active];
          let postObject = getPostInfo(post);

          this.imageSource = postObject.imageSource;
          this.videoSource = postObject.videoSource;
          this.title = postObject.title;
          this.selftext = postObject.selftext;

          if (!this.videoSource) {
            this.videoVisibilityClass = 'hidden';
          }

          if (!this.imageSource) {
            this.imageVisibilityClass = 'hidden';
          }

          if (!this.videoSource && !this.imageSource) {
            // console.log('!this.videoSource && !this.imageSource');
            this.titleVisibilityClass = 'hidden';
            this.textVisibilityClass = 'visible';
          }

          if (this.imageSource) {
            this.imageVisibilityClass = 'visible';
            this.videoVisibilityClass = 'hidden';

            this.titleVisibilityClass = 'visible';
            this.textVisibilityClass = 'hidden';
          }

          if (this.videoSource) {
            this.imageVisibilityClass = 'hidden';
            this.videoVisibilityClass = 'visible';

            this.titleVisibilityClass = 'visible';
            this.textVisibilityClass = 'hidden';
          }
        }
      } catch (e) {
        console.log(e, 'not good in render');
      }
    }
  }

  render() {
    window.scrollTo(0, 1);

    this.objectFitClass =
      this.props.api.visibilityOfElements.objectFitClass || 'cover';

    let currentPost = this.props.api.currentSubreddit.currentPost;
    this.preparePost(currentPost);
    this.currentSortMethod = this.props.api.currentSubreddit.sort;
    // console.log(this.currentSortMethod);

    return (
      <Hammer onDoubleTap={this.handleDoubleTap}>
        <Swipe
          onSwipeDown={this.onSwipeDown}
          onSwipeUp={this.onSwipeUp}
          onSwipeRight={this.onSwipeRight}
          onSwipeLeft={this.onSwipeLeft}
          tolerance={50}
        >
          <div class="sort" id="sort" onClick={this.changeSort}>
            <span
              id="sort-new"
              className={
                this.currentSortMethod == 'new' ? 'sort-current-method' : ''
              }
            >
              new
            </span>
            <span
              id="sort-hot"
              className={
                this.currentSortMethod == 'hot' ? 'sort-current-method' : ''
              }
            >
              hot
            </span>
          </div>

          <PostText
            visibilityClass={this.textVisibilityClass}
            title={this.title}
            selftext={this.selftext}
          />

          <div
            className="media"
            id="media"
            onDoubleClick={this.handleDoubleClick}
            onWheel={this.handleWheel}
          >
            <PostImage
              src={this.imageSource}
              objectFitClass={
                this.props.api.visibilityOfElements.objectFitClass
              }
              imageVisibilityClass={this.imageVisibilityClass}
            />

            <PostVideo
              src={this.videoSource}
              objectFitClass={
                this.props.api.visibilityOfElements.objectFitClass
              }
              videoVisibilityClass={this.videoVisibilityClass}
            />
          </div>
          <PostTitleAndDots
            numberOfSubPosts={this.numberOfSubPosts}
            active={this.active}
            titleVisibilityClass={this.titleVisibilityClass}
            title={this.title}
          />
        </Swipe>
      </Hammer>
    );
  }
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Post);
