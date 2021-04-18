export const filterPostsArray = (postsArray) => {
  postsArray = postsArray.map((post) => {
    if (post && post.crosspost_parent != null) {
      return post.crosspost_parent_list[0];
    } else {
      return post;
    }
  });

  console.log('postsArray', postsArray);

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

  console.log('filteredPostsArray', filteredPostsArray);
  return filteredPostsArray;
};
