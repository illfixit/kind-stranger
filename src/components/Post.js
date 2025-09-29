import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
} from "../actions/index";

import PostSelfText from "./PostSelfText";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";
import PostMeta from "./PostMeta";
import PostDots from "./PostDots";

import Hammer from "rc-hammerjs";
import { getPostInfo } from "../utils";
import PostTitle from "./PostTitle";

export const Post = (props) => {
  let oldShift = 0;
  let shift = 0;

  let imageSource = "";
  let imageVisible = false;

  let videoSource = "";
  let videoVisible = false;

  let title = "";
  let titleVisible = false;

  let selftext = "";
  let selfTextVisible = false;

  let dotsVisible = false;
  let numberOfSubPosts = 0;
  let active;

  useEffect(() => {
    props.dispatch(fetchNextPost());
    document.addEventListener("keydown", handleKeyboard, false);
    return document.removeEventListener("keydown", handleKeyboard, false);
  }, []);

  useEffect(() => {
    if (props.api.loading) {
      imageSource = "./images/loader.gif";
    }
  }, [props.api.loading]);

  const handleTap = (e) => {
    // console.log("tap ", e.target.id);
    // if (e.target.id == "top") onShowPreviousPost();
    // if (
    //   e.target.id == "bottom" ||
    //   e.target.id == "title" ||
    //   e.target.id == "subredditAndAuthor"
    // )
    //   showNextPost();
    // if (e.target.id == "left") onShowPreviousSubPost();
    // if (e.target.id == "right") onShowNextSubPost();
  };

  const handlePan = (e) => {
    if (e.center.y / window.innerHeight > 0.85) {
      // console.log("handlePan", e);
      oldShift = shift;
      shift = Math.min(
        Math.max(
          (0.5 - (e.center.x / window.innerWidth - 0.5) * 1.25).toFixed(2),
          0
        ),
        1
      );

      let newShift = ((shift + oldShift) * 100) / 2;

      if (document.getElementById("image"))
        document.getElementById("image").style.objectPosition = `${newShift}%`;
      if (document.getElementById("video"))
        document.getElementById("video").style.objectPosition = `${newShift}%`;
    } else {
      // console.log("handlePan else", e.center.x);
    }
  };

  const handlePanStart = (e) => {};

  const handlePanEnd = (e) => {};

  const handlePanCancel = (e) => {};

const handleGyroscope = (event) => {
  const gamma = event.gamma; // Left-right tilt in degrees
  oldShift = shift;
  shift = Math.min(
    Math.max(
      (0.5 - (gamma / 90) * 1.25).toFixed(2),
      0
    ),
    1
  );

  let newShift = ((shift + oldShift) * 100) / 2;

  if (document.getElementById("image"))
    document.getElementById("image").style.objectPosition = `${newShift}%`;
  if (document.getElementById("video"))
    document.getElementById("video").style.objectPosition = `${newShift}%`;
};

const requestGyroscopePermission = () => {
  if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleGyroscope);
          } else {
            alert('Permission denied');
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleGyroscope);
    }
  }
};

// Add a button to request permission
const button = document.createElement('button');
button.innerText = 'Enable Gyroscope';
button.style.position = 'fixed';
button.style.bottom = '10px';
button.style.left = '10px';
button.addEventListener('click', requestGyroscopePermission);
document.body.appendChild(button);

  const onSwipe = (e) => {
    // 50 - tolerance value
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (e.deltaY < 0) {
        onSwipeUp();
      } else {
        onSwipeDown();
      }
    } else {
      if (e.deltaX < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  };

  const onShowPreviousPost = () => {
    if (props.api.currentSubreddit.previousPosts.length > 1) {
      props.dispatch(showPreviousPost());
    }
  };

  const onShowNextPost = () => {
    if (props.api.currentSubreddit.nextPosts.length === 0) {
      try {
        props.dispatch(fetchNextPost());
      } catch (e) {
        console.log("Post", e);
        props.dispatch(fetchNextPost());
      }
    } else {
      props.dispatch(showNextPost());
    }
  };

  const onShowNextSubPost = () => {
    let active = props.api.currentSubreddit.currentPost[0].active;

    if (active < props.api.currentSubreddit.currentPost.length - 1) {
      props.dispatch(showNextSubpost());
    }
  };

  const onShowPreviousSubPost = () => {
    let active = props.api.currentSubreddit.currentPost[0].active;

    if (active > 1) {
      props.dispatch(showPreviousSubpost());
    }
  };

  const onSwipeDown = (position, event) => {
    onShowPreviousPost();
  };

  const onSwipeUp = (position, event) => {
    onShowNextPost();
  };

  const onSwipeLeft = (position, event) => {
    onShowNextSubPost();
  };

  const onSwipeRight = (position, event) => {
    onShowPreviousSubPost();
  };

  // handleDoubleTap (e) => {
  //   if (objectFitClass !== 'cover') {
  //     props.dispatch(changeMediaScale('cover'));
  //   } else {
  //     props.dispatch(changeMediaScale('contain'));
  //   }
  // }

  const handlePress = (e) => {
    e.preventDefault();
    if (
      (document.getElementById("image") &&
        document.getElementById("image").style.objectFit != "contain") ||
      (document.getElementById("video") &&
        document.getElementById("video").style.objectFit != "contain")
    ) {
      if (document.getElementById("image"))
        document.getElementById("image").style.objectFit = "contain";
      if (document.getElementById("video"))
        document.getElementById("video").style.objectFit = "contain";
    } else {
      if (document.getElementById("image"))
        document.getElementById("image").style.objectFit = "cover";
      if (document.getElementById("video"))
        document.getElementById("video").style.objectFit = "cover";
    }
  };

  const handlePressUp = (e) => {
    e.preventDefault();

    if (document.getElementById("image"))
      document.getElementById("image").style.objectFit = "cover";
    if (document.getElementById("video"))
      document.getElementById("video").style.objectFit = "cover";
  };

  const handleKeyboard = (e) => {
    // console.log(e);
    if (e.key === "ArrowDown") {
      if (props.api.currentSubreddit.nextPosts.length === 0) {
        try {
          props.dispatch(fetchNextPost());
        } catch (e) {
          console.log("Post", e);
          props.dispatch(fetchNextPost());
        }
      } else {
        props.dispatch(showNextPost());
      }
    } else if (e.key === "ArrowUp") {
      if (props.api.currentSubreddit.previousPosts.length > 1) {
        props.dispatch(showPreviousPost());
      }
    } else if (e.key === "ArrowLeft") {
      let active = props.api.currentSubreddit.currentPost[0].active;

      if (active > 1) {
        props.dispatch(showPreviousSubpost());
      }
    } else if (e.key === "ArrowRight") {
      let active = props.api.currentSubreddit.currentPost[0].active;

      if (active < props.api.currentSubreddit.currentPost.length - 1) {
        props.dispatch(showNextSubpost());
      }
    }
  };

  const changeSort = (e) => {
    let sortMethod = e.target.innerText.toLowerCase();
    // console.log('changeSort', sortMethod);
    if (sortMethod == "new" || sortMethod == "hot") {
      props.dispatch(changeSort(sortMethod));
      props.dispatch(fetchNextPost());
    }
  };

  const preparePost = (currentPost) => {
    if (currentPost != undefined) {
      try {
        if (currentPost[0]) {
          numberOfSubPosts = currentPost.length - 1;
          if (numberOfSubPosts > 1) {
            dotsVisible = true;
          } else {
            dotsVisible = false;
          }
          active = currentPost[0].active;

          let post = currentPost[active];
          let postObject = getPostInfo(post);
          // console.log('post', post)

          imageSource = postObject.imageSource;
          videoSource = postObject.videoSource;
          title = postObject.title;
          selftext = postObject.selftext;

          // console.log('imageSize', imageSize)

          if (!videoSource) {
            videoVisible = false;
          }

          if (!imageSource) {
            imageVisible = false;
          }

          if (!videoSource && !imageSource) {
            // console.log("!videoSource && !imageSource");
            titleVisible = false;
            selfTextVisible = true;
          }

          if (imageSource) {
            imageVisible = true;
            videoVisible = false;

            titleVisible = true;
            selfTextVisible = false;
          }

          if (videoSource) {
            imageVisible = false;
            videoVisible = true;

            titleVisible = true;
            selfTextVisible = false;
          }
        }
      } catch (e) {
        console.log(e, "not good in render");
      }
    }
  };

  let currentPost = props.api.currentSubreddit.currentPost;
  preparePost(currentPost);

  const options = {
    touchAction: "compute",
    recognizers: {
      // tap: {
      //     // time: 200,
      //     threshold: 10
      //     }
      press: {
        // time: 3000
        threshold: 1,
        // threshold: 3
      },
    },
  };

  return (
    <Hammer
      onDoubleTap={handleTap}
      onTap={handleTap}
      onPan={handlePan}
      onPanStart={handlePanStart}
      onPanEnd={handlePanEnd}
      onPanCancel={handlePanCancel}
      onPress={handlePress}
      onPressUp={handlePressUp}
      options={options}
      onSwipe={onSwipe}
      direction="DIRECTION_ALL"
    >
      <div>
        {/* <div id="coverModeNavigation">
            <div id="top">Top</div>
            <div id="left">Left</div>
            <div id="right">Right</div>
            <div id="bottom">Bottom</div>
          </div> */}

        {selfTextVisible ? (
          <PostSelfText title={title} selftext={selftext} />
        ) : null}

        <div className="media" id="media">
          {imageVisible ? (
            <PostImage src={imageSource} imageVisible={imageVisible} />
          ) : null}

          {videoVisible ? (
            <PostVideo src={videoSource} videoVisible={videoVisible} />
          ) : null}

          <PostMeta
            subreddit={
              props.api.currentSubreddit &&
              props.api.currentSubreddit.currentPost &&
              props.api.currentSubreddit.currentPost[active] &&
              props.api.currentSubreddit.currentPost[active].subreddit
            }
            author={
              props.api.currentSubreddit &&
              props.api.currentSubreddit.currentPost &&
              props.api.currentSubreddit.currentPost[active] &&
              props.api.currentSubreddit.currentPost[active].author
            }
          />
          {titleVisible ? <PostTitle title={title} /> : null}

          {dotsVisible ? (
            <PostDots numberOfSubPosts={numberOfSubPosts} active={active} />
          ) : null}
        </div>
      </div>
    </Hammer>
  );
};

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Post);
