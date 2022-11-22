import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
} from "../actions/index";

import PostText from "./PostText";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";
import PostInfo from "./PostInfo";

import Hammer from "rc-hammerjs";
import { getPostInfo } from "../utils";

export const Post = (props) => {
  let oldShift = 0;
  let shift = 0;

  let imageSource = "";
  let imageVisibilityClass = "hidden";
  let videoSource = "";
  let videoVisibilityClass = "hidden";
  let title = "";
  let titleVisibilityClass = "hidden";
  let selftext = "";
  let textVisibilityClass = "hidden";

  let currentSortMethod = "hot";
  let numberOfSubPosts = 0;
  let active;

  useEffect(() => {
    props.dispatch(fetchNextPost());
    document.addEventListener("keydown", handleKeyboard, false);
    return document.removeEventListener("keydown", handleKeyboard, false);
  }, []);

  const handleTap = (e) => {
    console.log("tap ", e.target.id);
    if (e.target.id == "top") onShowPreviousPost();
    if (
      e.target.id == "bottom" ||
      e.target.id == "title" ||
      e.target.id == "subredditAndAuthor"
    )
      showNextPost();
    if (e.target.id == "left") onShowPreviousSubPost();
    if (e.target.id == "right") onShowNextSubPost();
  };

  const handlePan = (e) => {
    if (e.center.y / window.innerHeight > 0.8) {
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

      document.getElementById("image").style.objectPosition = `${newShift}%`;
      document.getElementById("video").style.objectPosition = `${newShift}%`;
    } else {
      // console.log("handlePan else", e.center.x);
    }
  };

  const handlePanStart = (e) => {
    // console.log('handlePanStart', e)
  };

  const handlePanEnd = (e) => {
    // console.log('handlePanEnd', e)
    // shift = 0;
    // document.getElementById('image').style.objectFit = "contain";
    // document.getElementById('video').style.objectFit = "contain";
    // document.getElementById('image').style.objectPosition = "center";
    // document.getElementById('video').style.objectPosition = "center";
  };

  const handlePanCancel = (e) => {
    // console.log('handlePanCancel', e)
  };

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
    // console.log('onSwipeDown')
    // e.preventDefault()
    // document.getElementById('image').style.objectFit = "contain";
    // document.getElementById('video').style.objectFit = "contain";
    // document.getElementById('image').style.objectPosition = "center";
    // document.getElementById('video').style.objectPosition = "center";
    onShowPreviousPost();
  };

  const onSwipeUp = (position, event) => {
    // console.log('onSwipeUp')
    // e.preventDefault()
    // document.getElementById('image').style.objectFit = "contain";
    // document.getElementById('video').style.objectFit = "contain";
    // document.getElementById('image').style.objectPosition = "center";
    // document.getElementById('video').style.objectPosition = "center";
    onShowNextPost();
  };

  const onSwipeLeft = (position, event) => {
    // console.log('onSwipeLeft')

    // e.preventDefault()

    // document.getElementById('image').style.objectFit = "contain";
    // document.getElementById('video').style.objectFit = "contain";
    // document.getElementById('image').style.objectPosition = "center";
    // document.getElementById('video').style.objectPosition = "center";

    // console.log('onSwipeLeft', props.api.currentSubreddit.currentPost);
    onShowNextSubPost();
  };

  const onSwipeRight = (position, event) => {
    // console.log('onSwipeRight')

    // e.preventDefault()

    // document.getElementById('image').style.objectFit = "contain";
    // document.getElementById('video').style.objectFit = "contain";
    // document.getElementById('image').style.objectPosition = "center";
    // document.getElementById('video').style.objectPosition = "center";

    // console.log('onSwipeRight', props.api.currentSubreddit.currentPost);
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
    if (document.getElementById("image").style.objectFit != "contain") {
      document.getElementById("image").style.objectFit = "contain";
      document.getElementById("video").style.objectFit = "contain";
    } else {
      document.getElementById("image").style.objectFit = "cover";
      document.getElementById("video").style.objectFit = "cover";
    }
  };

  const handlePressUp = (e) => {
    document.getElementById("image").style.objectFit = "cover";
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
            videoVisibilityClass = "hidden";
          }

          if (!imageSource) {
            imageVisibilityClass = "hidden";
          }

          if (!videoSource && !imageSource) {
            // console.log("!videoSource && !imageSource");
            titleVisibilityClass = "hidden";
            textVisibilityClass = "visible";
          }

          if (imageSource) {
            imageVisibilityClass = "visible";
            videoVisibilityClass = "hidden";

            titleVisibilityClass = "visible";
            textVisibilityClass = "hidden";
          }

          if (videoSource) {
            imageVisibilityClass = "hidden";
            videoVisibilityClass = "visible";

            titleVisibilityClass = "visible";
            textVisibilityClass = "hidden";
          }
        }
      } catch (e) {
        console.log(e, "not good in render");
      }
    }
  };

  let currentPost = props.api.currentSubreddit.currentPost;
  preparePost(currentPost);
  currentSortMethod = props.api.currentSubreddit.sort;
  // console.log(currentSortMethod);

  let options = {
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
        <PostText
          visibilityClass={textVisibilityClass}
          title={title}
          selftext={selftext}
        />

        <div className="media" id="media">
          <PostImage
            src={imageSource}
            imageVisibilityClass={imageVisibilityClass}
          />

          <PostVideo
            src={videoSource}
            videoVisibilityClass={videoVisibilityClass}
          />
          <div id="coverModeNavigation">
            <div id="top">Top</div>
            <div id="left">Left</div>
            <div id="right">Right</div>
            <div id="bottom">Bottom</div>
          </div>
        </div>
        <PostInfo
          numberOfSubPosts={numberOfSubPosts}
          imageSource={imageSource}
          // imageSize={imageSize}
          active={active}
          titleVisibilityClass={titleVisibilityClass}
          title={title}
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
      </div>
    </Hammer>
  );
};

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Post);
