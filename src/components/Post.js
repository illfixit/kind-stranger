import React from 'react';
import Swipe from 'react-easy-swipe';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSubreddit: {
        url: 'r/itookapicture/',
        after: '',
        sort: 'hot',
        currentPost: {},
        previousPosts: [],
        nextPosts: [],
      },
      previousSubreddit: {
        url: '',
        after: '',
        sort: 'hot',
        currentPost: {},
        previousPosts: [],
        nextPosts: [],
      },
    };

    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  componentDidMount() {
    this.downloadNextPost();
    // setTimeout(() => {
    //   this.downloadNextPost();
    // }, 5000);
  }

  // downloadNextPost() {
  //   let url = this.state.currentSubreddit.url;
  //   let sort = this.state.currentSubreddit.sort;
  //   let after = this.state.currentSubreddit.after;

  //   fetch(`https://www.reddit.com/${url}${sort}.json?&limit=1&after=${after}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('data', data);
  //       let post = data.data.children[0].data;

  //       if (
  //         post.preview.images[0] != null ||
  //         post.domain.includes('imgur') ||
  //         post.url.includes('jpg')
  //       ) {
  //         if (!post.url.includes('youtu')) {
  //           this.setState((previousState) => {
  //             return {
  //               ...previousState,
  //               currentSubreddit: {
  //                 ...previousState.currentSubreddit,
  //                 previousPosts: [
  //                   ...previousState.currentSubreddit.previousPosts,
  //                   previousState.currentSubreddit.currentPost,
  //                 ],
  //                 currentPost: post,
  //                 after: data.data.after,
  //               },
  //             };
  //           });
  //         }
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       // this.downloadNextPost();
  //     });
  // }

  filterPostsArray(postsArray) {
    let filteredPostsArray = postsArray.filter(
      (post) =>
        ((post.preview && post.preview.images[0] != null) ||
          post.media_metadata != null ||
          post.domain.includes('imgur') ||
          post.url.includes('jpg')) &&
        !post.url.includes('youtu')
    );

    filteredPostsArray = filteredPostsArray.map((post) => {
      let artificialPostsArray = [];

      if (post.media_metadata != null) {
        let resolutions = [];
        for (const [key, value] of Object.entries(post.media_metadata)) {
          resolutions.push(
            value.p.map((x) => {
              return { url: x.u, width: x.x, height: x.y };
            })
          );
        }

        resolutions.forEach((r) => {
          artificialPostsArray.push({
            ...post,
            preview: { images: [{ resolutions: r }], enabled: true },
          });
        });
      }

      return artificialPostsArray.length > 1 ? artificialPostsArray : post;
    });

    console.log(filteredPostsArray);

    filteredPostsArray = filteredPostsArray.reduce((acc, post) => {
      if (Array.isArray(post)) {
        console.log('post', post);
        post.forEach((p) => acc.unshift(p));
      } else {
        acc.push(post);
      }
      return acc;
    }, []);

    filteredPostsArray.unshift({ active: 1 });

    // if (filteredPostsArray.length < 1) {
    //   throw new Error('post contains only text');
    // } else {
    //   filteredPostsArray.push({ active: 0 });
    // }

    console.log('filteredPostsArray', filteredPostsArray);

    return filteredPostsArray;
  }

  downloadNextPost() {
    let url = this.state.currentSubreddit.url;
    let sort = this.state.currentSubreddit.sort;
    let after = this.state.currentSubreddit.after;

    fetch(`https://www.reddit.com/${url}${sort}.json?&limit=1&after=${after}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);

        let postsArray = data.data.children.map((post) => post.data);

        // console.log(postsArray);
        let filteredPostsArray;

        try {
          filteredPostsArray = this.filterPostsArray(postsArray);
        } catch (e) {
          console.log(e);
        }

        this.setState((previousState) => {
          return {
            ...previousState,
            currentSubreddit: {
              ...previousState.currentSubreddit,
              previousPosts: [
                ...previousState.currentSubreddit.previousPosts,
                previousState.currentSubreddit.currentPost,
              ],
              currentPost: filteredPostsArray,
              after: data.data.after,
            },
          };
        });
        console.log('-------------------- NEXT --------------------');
      })
      .catch((e) => {
        console.log(e);
        // this.downloadNextPost();
      });
  }

  componentDidUpdate() {
    // console.log('cDU state', this.state);
  }

  onSwipeDown(position, event) {
    // console.log('onSwipeDown', position, event);
    // console.log('state before onSwipeDown', this.state);
    if (this.state.currentSubreddit.previousPosts.length > 1) {
      this.setState((previousState) => {
        return {
          ...previousState,
          currentSubreddit: {
            ...previousState.currentSubreddit,
            previousPosts: previousState.currentSubreddit.previousPosts.slice(
              0,
              -1
            ),
            currentPost:
              previousState.currentSubreddit.previousPosts[
                previousState.currentSubreddit.previousPosts.length - 1
              ],
            nextPosts: [
              ...previousState.currentSubreddit.nextPosts,
              previousState.currentSubreddit.currentPost,
            ],
          },
        };
      });
    }
    // console.log('state after onSwipeDown', this.state);
  }

  onSwipeUp(position, event) {
    // console.log('onSwipeUp', position, event);
    // console.log('state before onSwipeUp', this.state);
    if (this.state.currentSubreddit.nextPosts.length === 0) {
      this.downloadNextPost();
    } else {
      // console.log('state before', this.state);
      this.setState((previousState) => {
        return {
          ...previousState,
          currentSubreddit: {
            ...previousState.currentSubreddit,
            previousPosts: [
              ...previousState.currentSubreddit.previousPosts,
              previousState.currentSubreddit.currentPost,
            ],
            currentPost:
              previousState.currentSubreddit.nextPosts[
                previousState.currentSubreddit.nextPosts.length - 1
              ],
            nextPosts: previousState.currentSubreddit.nextPosts.slice(0, -1),
          },
        };
      });
      // console.log('state after', this.state);
    }
    // console.log('state after onSwipeUp', this.state);
  }

  onSwipeRight(position, event) {
    // console.log('onSwipeRight', position, event);
    // console.log('state before onSwipeRight', this.state);

    this.setState((previousState) => {
      let active = previousState.currentSubreddit.currentPost[0].active;

      if (active > 1) {
        active--;
      } else {
        return;
      }

      return {
        ...previousState,
        currentSubreddit: {
          ...previousState.currentSubreddit,
          currentPost: previousState.currentSubreddit.currentPost.map((p) => {
            return p.active == null
              ? p
              : {
                  active,
                };
          }),
        },
      };
    });
    console.log('state after onSwipeRight', this.state);
  }

  onSwipeLeft(position, event) {
    // console.log('onSwipeLeft', position, event);
    // console.log('state before onSwipeLeft', this.state);

    this.setState((previousState) => {
      let active = previousState.currentSubreddit.currentPost[0].active;

      // currentPost.length - 2 because currentPost.length - 1
      // is a service object {active: {number}}
      if (active < previousState.currentSubreddit.currentPost.length - 1) {
        active++;
      } else {
        return;
      }

      return {
        ...previousState,
        currentSubreddit: {
          ...previousState.currentSubreddit,
          currentPost: previousState.currentSubreddit.currentPost.map((p) => {
            return p.active == null
              ? p
              : {
                  active,
                };
          }),
        },
      };
    });

    console.log('state after onSwipeLeft', this.state);
  }

  render() {
    // let postsArray = this.state.currentSubreddit.currentPost;

    // console.log(this.state);

    let imageSource = null;
    let title = null;

    try {
      if (this.state.currentSubreddit.currentPost.length > 0) {
        let active = this.state.currentSubreddit.currentPost[0].active;

        let post = this.state.currentSubreddit.currentPost[active];

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
