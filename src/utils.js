export const filterPostsArray = (postsArray) => {
  postsArray = postsArray.map((post) => {
    if (post && post.crosspost_parent != null) {
      return post.crosspost_parent_list[0];
    } else {
      return post;
    }
  });

  // console.log('postsArray', postsArray);

  let filteredPostsArray = postsArray.filter((post) => {
    return (
      (post.preview && post.preview.images[0] != null) ||
      post.media_metadata != null ||
      post.domain.includes("imgur") ||
      post.url.includes("jpg") ||
      post.selftext != null
    );
  });

  if (filteredPostsArray.length < 1) {
    throw new Error("incompatible post");
  }

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

  filteredPostsArray = filteredPostsArray.reduce((acc, post) => {
    if (Array.isArray(post)) {
      post.forEach((p) => acc.unshift(p));
    } else {
      acc.push(post);
    }
    return acc;
  }, []);

  filteredPostsArray.unshift({
    active: 1,
    numberOfSubposts: filteredPostsArray.length,
  });

  // console.log('filteredPostsArray', filteredPostsArray);
  return filteredPostsArray;
};

export const getBasicResults = () => {
  return;
  [
    `<div class="result">
  <img src="https://styles.redditmedia.com/t5_2r1tc/styles/communityIcon_p1gzakhq6y201.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/itookapicture/</div>`,
    `<div class="result">
  <img src="https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_6fzlk8ukx6s51.jpg" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/aww/</div>`,
    `<div class="result">
  <img src="https://b.thumbs.redditmedia.com/VoZlOfOxgNGkqayUrmGI96XuSOGKVT-MVI4WK-CXP3o.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/art/</div>`,
    `<div class="result">
  <img src="https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/cozyplaces/</div>`,
    `<div class="result">
  <img src="https://a.thumbs.redditmedia.com/bDWcvO6mkX1TIcTnrO-N-5QJPUaWaq6nnQFel3kywD8.png" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">/r/food/</div>`,
  ];
};

// .url.replace(/amp;/gi, '')
export const prefetchImages = (images) => {
  // console.log('Prefetch Images');
  images.forEach((image) => {
    try {
      let img = new Image();
      img.src = image.url;
    } catch (e) {}
  });
};

export const getPostInfo = (post) => {
  let imageSource = "";
  let videoSource = "";
  let title = "";
  let selftext = "";

  // console.log('post resolution:', post.preview.images[0].resolutions[
  //   post.preview.images[0].resolutions.length - 1
  // ]);

  imageSource =
    post.preview &&
    post.preview.images &&
    post.preview.images[0].resolutions.length > 0
      ? post.preview.images[0].resolutions[
          post.preview.images[0].resolutions.length - 1
        ].url.replace(/amp;/gi, "")
      : undefined;

  if (post.url && post.url.includes("redd") && post.url.includes(".gif")) {
    imageSource = post.url;
    // console.log("redd, gif ");
  }

  if (post.url && post.url.includes("gfycat")) {
    imageSource = post.secure_media.oembed.thumbnail_url;
    // console.log("gfycat ");
  }

  if (post.url && post.url.endsWith(".gifv") && !post.url.includes("redd")) {
    videoSource = post.url.replace("gifv", "mp4");
    // console.log("redd, gifv ");
  }

  if (post.url && post.url.endsWith(".gif") && !post.url.includes("redd")) {
    videoSource = post.url.replace("gif", "mp4");
    // console.log("redd, !gif ");
  }

  if (post.media && post.media.reddit_video != null) {
    videoSource = post.media.reddit_video.fallback_url;
    // console.log("reddit_video ");
  }

  if (post.url && post.url.includes("redgif")) {
    videoSource = post.preview.reddit_video_preview.fallback_url;
    // console.log("redgif ");
  }

  title = post.title;
  selftext = post.selftext ? post.selftext : "";

  if (typeof imageSource == "undefined") imageSource = "";
  if (typeof videoSource == "undefined") videoSource = "";
  if (typeof title == "undefined") title = "";
  if (typeof selftext == "undefined") selftext = "";

  // console.log(
  //   imageSource,
  //   '|',
  //   videoSource,
  //   '|',
  //   title,
  //   '|',
  //   selftext.slice(0, 16)
  // );

  // if (imageSource) {
  //   imageSize = [
  //     post.preview.images[0].resolutions[
  //       post.preview.images[0].resolutions.length - 1
  //     ].width,
  //     post.preview.images[0].resolutions[
  //       post.preview.images[0].resolutions.length - 1
  //     ].height,
  //   ];
  // } else {
  //   imageSource = "";
  //   imageSize = [0, 0];
  // }

  return {
    imageSource,
    videoSource,
    title,
    selftext,
  };
};
