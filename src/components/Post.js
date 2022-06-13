import React from 'react';
import { connect } from 'react-redux';
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
  changeSort,
} from '../actions/index';
import Swipe from 'react-easy-swipe';

import PostText from './PostText';
import PostImage from './PostImage';
import PostVideo from './PostVideo';
import PostInfo from './PostInfo';

import Comments from './Comments';
import Hammer from 'rc-hammerjs';
import { getPostInfo } from '../utils';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.onSwipe = this.onSwipe.bind(this);
    // this.handleDoubleTap = this.handleDoubleTap.bind(this);
    // this.handleTap = this.handleTap.bind(this);

    this.handlePan = this.handlePan.bind(this);
    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePanCancel = this.handlePanCancel.bind(this);


    this.pressed = false;
    this.handlePress = this.handlePress.bind(this);
    this.handlePressUp = this.handlePressUp.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.changeSort = this.changeSort.bind(this);
    // this.showPostComments = this.showPostComments.bind(this);

    this.imageSource = '';
    this.imageVisibilityClass = 'hidden';

    this.videoSource = '';
    this.videoVisibilityClass = 'hidden';

    // this.imageSize = [0,0];

    this.title = '';
    this.titleVisibilityClass = 'hidden';

    this.selftext = '';
    this.textVisibilityClass = 'hidden';

    this.objectFitClass = 'contain';
    this.numberOfSubPosts = 0;
    this.active;

    this.currentSortMethod = 'hot';
    this.intervalId = 0;

    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchNextPost());
    document.addEventListener('keydown', this.handleKeyboard, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard, false);
  }

  // handleTap(e) {
  //   console.log('handleTap')
  // }

  handlePan(e) {
    // console.log('handlePan', e)
  }

  handlePanStart(e) {
    // console.log('handlePanStart', e)
  }

  handlePanEnd(e) {
    // console.log('handlePanEnd', e)
    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";

  }

  handlePanCancel(e) {
    // console.log('handlePanCancel', e)
  }

  onSwipe(e) {
    // console.log('onSwipe');
    this.pressed = false;
    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";
    // 50 - tolerance value
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if(e.deltaY < 0) {
        this.onSwipeUp()
      } else {
        this.onSwipeDown()
      }
    } else {
      if(e.deltaX < 0) {
        this.onSwipeLeft()
      } else {
        this.onSwipeRight()
      }
    }
  }

  onSwipeDown(position, event) {
    // console.log('onSwipeDown')
    // e.preventDefault()

    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";
    if (this.props.api.currentSubreddit.previousPosts.length > 1) {
      this.props.dispatch(showPreviousPost());
    }

  
  }

  onSwipeUp(position, event) {
    // console.log('onSwipeUp')
    // e.preventDefault()

    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";
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
    // console.log('onSwipeLeft')

    // e.preventDefault()

    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";
    // console.log('onSwipeLeft', this.props.api.currentSubreddit.currentPost);

      let active = this.props.api.currentSubreddit.currentPost[0].active;

      if (active < this.props.api.currentSubreddit.currentPost.length - 1) {
        this.props.dispatch(showNextSubpost());
      }
    
    

  }

  onSwipeRight(position, event) {
    // console.log('onSwipeRight')

    // e.preventDefault()

    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";
    // console.log('onSwipeRight', this.props.api.currentSubreddit.currentPost);
      let active = this.props.api.currentSubreddit.currentPost[0].active;

      if (active > 1) {
        this.props.dispatch(showPreviousSubpost());
      }
  }

  // handleDoubleTap(e) {
  //   if (this.objectFitClass !== 'cover') {
  //     this.props.dispatch(changeMediaScale('cover'));
  //   } else {
  //     this.props.dispatch(changeMediaScale('contain'));
  //   }
  // }

  handlePress(e) {
    // console.log('handlePress', e)

    // e.preventDefault()
    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";


    if(e.target.id == 'image' || e.target.id == 'video') {
      this.pressed = true;
      document.getElementById('image').style.objectFit = "contain";
      document.getElementById('video').style.objectFit = "contain";

    }
  }

  handlePressUp(e) {
    // console.log('handlePressUp', e)
    // e.preventDefault()
    this.pressed = false;

    document.getElementById('image').style.objectFit = "cover";
    document.getElementById('video').style.objectFit = "cover";
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
    // console.log('changeSort', sortMethod);
    if (sortMethod == 'new' || sortMethod == 'hot') {
      this.props.dispatch(changeSort(sortMethod));
      this.props.dispatch(fetchNextPost());
    }
  }

  preparePost(currentPost) {
    if (currentPost != undefined) {
      try {
        if (currentPost[0]) {
          this.numberOfSubPosts = currentPost.length - 1;
          this.active = currentPost[0].active;

          let post = currentPost[this.active];
          let postObject = getPostInfo(post);
          // console.log('post', post)

          this.imageSource = postObject.imageSource;
          this.videoSource = postObject.videoSource;
          this.title = postObject.title;
          this.selftext = postObject.selftext;
          this.imageSize = postObject.imageSize;

          // console.log('this.imageSize', this.imageSize)

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
    // try{
    //   console.log()
    // } catch(e) {}


    let currentPost = this.props.api.currentSubreddit.currentPost;
    this.preparePost(currentPost);
    this.currentSortMethod = this.props.api.currentSubreddit.sort;
    // console.log(this.currentSortMethod);

    let options = {
      touchAction:'compute',
      recognizers: {
          // tap: {
          //     // time: 200,
          //     threshold: 10
          //     }
            press: {
              // time: 3000
              threshold: 1
              // threshold: 3

            }
          }
      };

    return (
      <Hammer 
        // onDoubleTap={this.handleDoubleTap} 
        // onTap={this.handleTap}
        onPan={this.handlePan}
        onPanStart={this.handlePanStart}
        onPanEnd={this.handlePanEnd}
        onPanCancel={this.handlePanCancel}

        onPress={this.handlePress}
        onPressUp={this.handlePressUp}
        options={options}
        onSwipe={this.onSwipe}
        direction='DIRECTION_ALL'
        >
          <div>
          <div class="sort" id="sort" onClick={this.changeSort}>
            <span
              id="sort-new"
              className={
                this.currentSortMethod == 'new' ? 'sort-current-method' : ''
              }
            >
              New
            </span>{' '}
            |{' '}
            <span
              id="sort-hot"
              className={
                this.currentSortMethod == 'hot' ? 'sort-current-method' : ''
              }
            >
              Hot
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
            onWheel={this.handleWheel}
          >
            <PostImage
              src={this.imageSource}

              imageVisibilityClass={this.imageVisibilityClass}
            />

            <PostVideo
              src={this.videoSource}

              videoVisibilityClass={this.videoVisibilityClass}
            />
          </div>
          <PostInfo
            numberOfSubPosts={this.numberOfSubPosts}
            imageSource={this.imageSource}
            // imageSize={this.imageSize}
            active={this.active}
            titleVisibilityClass={this.titleVisibilityClass}
            title={this.title}
            subreddit={this.props.api.currentSubreddit.currentPost[this.active] && this.props.api.currentSubreddit.currentPost[this.active].subreddit}
            author={this.props.api.currentSubreddit.currentPost[this.active] && this.props.api.currentSubreddit.currentPost[this.active].author}
          />
          </div>
      </Hammer>
    );
  }
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Post);
