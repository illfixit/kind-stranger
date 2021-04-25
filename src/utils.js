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
      post.domain.includes('imgur') ||
      post.url.includes('jpg')
    );
  });

  if (filteredPostsArray.length < 1) {
    throw new Error('incompatible post');
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
