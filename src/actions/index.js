import {
  FETCH_NEXT_POST_STARTED,
  FETCH_NEXT_POST_SUCCESS,
  FETCH_NEXT_POST_FAILURE,
  SHOW_PREVIOUS_POST,
  SHOW_NEXT_POST,
  SHOW_NEXT_SUBPOST,
  SHOW_PREVIOUS_SUBPOST,
} from '../actiontypes';
import filterPostsArray from '../utils';

export const fetchNextPost = (url, sort, after) => {
  return (dispatch) => {
    dispatch(fetchNextPostStarted());

    fetch(`https://www.reddit.com/${url}${sort}.json?&limit=1&after=${after}`)
      .then((response) => response.json())
      .then((data) => {
        let postsArray = data.data.children.map((post) => post.data);
        let after = data.data.after;
        let filteredPostsArray;

        try {
          filteredPostsArray = filterPostsArray(postsArray);
        } catch (e) {
          console.log(e);
        }
        // console.log('fetchNextPost', filteredPostsArray);
        dispatch(fetchNextPostSuccess({ filteredPostsArray, after }));
      })
      .catch((e) => {
        dispatch(fetchNextPostFailure(e));
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
