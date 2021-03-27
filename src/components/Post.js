import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSubreddit: {
        url: 'r/itookapicture/',
        after: '',
        sort: 'hot',
        currentPost: '',
      },
      previousSubreddit: {
        url: '',
        after: '',
        sort: 'hot',
        currentPost: '',
      },
    };
  }

  componentDidMount() {
    this.downloadNextPost();
    setTimeout(() => {
      this.downloadNextPost();
    }, 5000);
  }

  downloadNextPost() {
    console.log('dNP state', this.state);
    let url = this.state.currentSubreddit.url;
    let sort = this.state.currentSubreddit.sort;
    let after = this.state.currentSubreddit.after;

    fetch(`https://www.reddit.com/${url}${sort}.json?&limit=1&after=${after}`)
      .then((response) => response.json())
      .then((data) => {
        let post = data.data.children[0].data;
        console.log('inside fetch', post);

        if (
          post.preview.images[0] != null ||
          post.domain.includes('imgur') ||
          post.url.includes('jpg')
        ) {
          if (!post.url.includes('youtu')) {
            image.classList.add('loading');
            video.classList.add('loading');

            this.setState((prevState) => {
              return {
                ...prevState,
                currentSubreddit: {
                  ...prevState.currentSubreddit,
                  currentPost: post,
                  after: data.data.after,
                },
              };
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
        // this.downloadNextPost();
      });
  }

  componentDidUpdate() {
    console.log('cDU state', this.state);
  }

  render() {
    let post = this.state.currentSubreddit.currentPost;

    console.log(post);
    let imageSource = post.preview
      ? post.preview.images[0].resolutions[
          post.preview.images[0].resolutions.length - 1
        ].url.replace(/amp;/gi, '')
      : '';

    return (
      <React.Fragment>
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
            <div className="title" id="title"></div>
          </a>
        </div>
      </React.Fragment>
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
