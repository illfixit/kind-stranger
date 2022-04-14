import {
  FETCH_NEXT_POST_STARTED,
  FETCH_NEXT_POST_SUCCESS,
  FETCH_NEXT_POST_FAILURE,
  UPDATE_CURRENT_SUBREDDIT_AFTER,
  SHOW_CURRENT_POST,
  SHOW_PREVIOUS_POST,
  SHOW_NEXT_POST,
  SHOW_NEXT_SUBPOST,
  SHOW_PREVIOUS_SUBPOST,
  CHECK_IF_SUBREDDIT_IS_OK_STARTED,
  CHECK_IF_SUBREDDIT_IS_OK_FAILURE,
  CHECK_IF_SUBREDDIT_IS_OK_SUCCESS,
  CHANGE_SUBREDDIT,
  CHANGE_SEARCH_TERM,
  GET_LIST_OF_SUBREDDITS,
  GET_LIST_OF_SUBREDDITS_STARTED,
  GET_LIST_OF_SUBREDDITS_FAILURE,
  GET_LIST_OF_SUBREDDITS_SUCCESS,
  UPDATE_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
  SHOW_SEARCH_RESULTS,
  CHANGE_VISIBILITY,
  CHANGE_PRELOAD_AFTER,
  UPDATE_PRELOADED,
  CHANGE_MEDIA_SCALE,
  SHOW_COMMENTS,
  HIDE_COMMENTS,
  CHANGE_SORT,
} from '../actiontypes';
import { filterPostsArray, prefetchImages } from '../utils';
import store from '../store';

export const fetchNextPost = () => {
  const { url, sort, after } = store.getState().api.currentSubreddit;

  return (dispatch) => {
    dispatch(fetchNextPostStarted());

    fetch(`https://www.reddit.com${url}${sort}.json?limit=1&after=${after}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateCurrentSubredditAfter(data.data.after));

        let postsArray = data.data.children.map((post) => post.data);
        let after = data.data.after;
        let filteredPostsArray;

        try {
          filteredPostsArray = filterPostsArray(postsArray);
        } catch (e) {
          // console.log('INCOMPATIBLE POST', postsArray);
          dispatch(fetchNextPostFailure({ e }));
          dispatch(fetchNextPost());
        }

        dispatch(fetchNextPostSuccess({ filteredPostsArray, after }));
        dispatch(showCurrentPost());

        if (
          store.getState().api.preload.preloaded.length * 5 -
            store.getState().api.currentSubreddit.previousPosts.length <
          5
        ) {
          dispatch(prefetchPostsInCurrentSubreddit());
        }
      })
      .catch((e) => {
        // console.log('FETCH_NEW_POST failed');
        dispatch(fetchNextPostFailure({ e }));
        dispatch(fetchNextPost());
      });
  };
};

export const checkIfSubredditIsOk = (subreddit) => {
  return (dispatch) => {
    dispatch(checkIfSubredditIsOkStarted());

    let exists = false;
    fetch(`https://www.reddit.com${subreddit}hot.json`)
      .then((data) => data.json())
      .then((data) => {
        // console.log('check', data.data);

        // IMPORTANT ORIGINAL CHECK IF SUBREDDIT HAS IMAGES
        // for (let i = 1; i < 10; i++) {
        //   try {
        //     if (
        //       data.data.children[i].data.preview.images[0].resolutions.length >
        //       1
        //     ) {
        //       exists = true;
        //       break;
        //     }
        //   } catch (e) {
        //     // console.log(e);
        //   }
        // }

        exists = true;
        if (exists === false) {
          dispatch(checkIfSubredditIsOkFailure('Bad subreddit'));
        } else if (exists === true) {
          dispatch(checkIfSubredditIsOkSuccess());
          dispatch(hideSearchResults(subreddit.slice(3, -1)));
          dispatch(changeSubreddit(subreddit));
          dispatch(prefetchPostsInCurrentSubreddit());
          dispatch(fetchNextPost());
        }
      })
      .catch((e) => {
        // console.log(`${subreddit} doesn't exist!`);
        // alert('Please, choose another subreddit');
        exists = false;
        dispatch(checkIfSubredditIsOkFailure('Bad subreddit'));
      });
  };
};

export const getListOfSubreddits = (searchTerm) => {
  return (dispatch) => {
    dispatch(getListOfSubredditsStarted());

    fetch(
      `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${searchTerm}&include_over_18=true&raw_json=1&gilding_detail=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let results = data.data.children.filter(
          (r) => typeof r.data.url === 'string'
        );

        dispatch(showSearchResults());
        dispatch(getListOfSubredditsSuccess());
        dispatch(updateSearchResults(results));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getListOfSubredditsFailure(e));
      });
  };
};

const fetchNextPostStarted = () => ({
  type: FETCH_NEXT_POST_STARTED,
});

const fetchNextPostSuccess = (post) => ({
  type: FETCH_NEXT_POST_SUCCESS,
  payload: {
    ...post,
  },
});

const fetchNextPostFailure = (error) => ({
  type: FETCH_NEXT_POST_FAILURE,
  payload: {
    error,
  },
});

const updateCurrentSubredditAfter = (after) => ({
  type: UPDATE_CURRENT_SUBREDDIT_AFTER,
  payload: { after },
});

export const showCurrentPost = () => {
  return {
    type: SHOW_CURRENT_POST,
  };
};

export const showPreviousPost = () => {
  return {
    type: SHOW_PREVIOUS_POST,
  };
};

export const showNextPost = () => {
  return {
    type: SHOW_NEXT_POST,
  };
};

export const showNextSubpost = () => {
  return {
    type: SHOW_NEXT_SUBPOST,
  };
};

export const showPreviousSubpost = () => {
  return {
    type: SHOW_PREVIOUS_SUBPOST,
  };
};

const checkIfSubredditIsOkStarted = () => ({
  type: CHECK_IF_SUBREDDIT_IS_OK_STARTED,
});

const checkIfSubredditIsOkSuccess = () => ({
  type: CHECK_IF_SUBREDDIT_IS_OK_SUCCESS,
});

const checkIfSubredditIsOkFailure = (error) => ({
  type: CHECK_IF_SUBREDDIT_IS_OK_FAILURE,
  payload: {
    error,
  },
});

export const changeSubreddit = (subreddit) => ({
  type: CHANGE_SUBREDDIT,
  payload: {
    subreddit,
  },
});

export const changeSearchTerm = (searchTerm) => ({
  type: CHANGE_SEARCH_TERM,
  payload: {
    searchTerm,
  },
});

// TO REFACTOR START

const getListOfSubredditsStarted = () => ({
  type: GET_LIST_OF_SUBREDDITS_STARTED,
});

const getListOfSubredditsFailure = () => ({
  type: GET_LIST_OF_SUBREDDITS_FAILURE,
});

const getListOfSubredditsSuccess = () => ({
  type: GET_LIST_OF_SUBREDDITS_SUCCESS,
});

// END

const updateSearchResults = (results) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload: results,
});

export const hideSearchResults = (subreddit) => ({
  type: HIDE_SEARCH_RESULTS,
  payload: subreddit,
});

export const showSearchResults = () => ({
  type: SHOW_SEARCH_RESULTS,
});

export const changeVisibility = (elements) => ({
  type: CHANGE_VISIBILITY,
  payload: elements,
});

export const prefetchPostsInCurrentSubreddit = () => {
  return (dispatch) => {
    let { subreddit, after, sort } = store.getState().api.preload;

    if (typeof sort == 'undefined') {
      sort = 'hot';
    }

    fetch(
      `https://www.reddit.com${subreddit}${sort}.json?limit=5&after=${after}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(changePreloadAfter(data.data.after));

        let posts = data.data.children;
        // console.log('posts', posts);
        let images = posts.map((post) => {
          try {
            return {
              subreddit,
              url: post.data.preview.images[0].resolutions[
                post.data.preview.images[0].resolutions.length - 1
              ].url.replace(/amp;/gi, ''),
            };
          } catch (e) {
            console.log('unable to prefetch');
          }
        });
        // console.log('images[0].url', images[0].url);

        // images.forEach((image) => {
        //   let img = new Image();
        //   img.src = image.url;
        // });

        prefetchImages(images);
        dispatch(updatePreloaded(images));
      });
  };
};

export const changePreloadAfter = (after) => ({
  type: CHANGE_PRELOAD_AFTER,
  payload: after,
});

const updatePreloaded = (images) => ({
  type: UPDATE_PRELOADED,
  payload: images,
});

export const changeMediaScale = (objectFitClass) => {
  return {
    type: CHANGE_MEDIA_SCALE,
    payload: objectFitClass,
  };
};

export const changeSort = (srt) => {
  return {
    type: CHANGE_SORT,
    payload: srt,
  };
};

export const showComments = () => ({
  type: SHOW_COMMENTS,
});

export const hideComments = () => ({
  type: HIDE_COMMENTS,
});
