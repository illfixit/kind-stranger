export default (postsArray) => {
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

  // console.log(filteredPostsArray);

  filteredPostsArray = filteredPostsArray.reduce((acc, post) => {
    if (Array.isArray(post)) {
      // console.log('post', post);
      post.forEach((p) => acc.unshift(p));
    } else {
      acc.push(post);
    }
    return acc;
  }, []);

  filteredPostsArray.unshift({ active: 1 });

  return filteredPostsArray;
};

/*


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

  */
