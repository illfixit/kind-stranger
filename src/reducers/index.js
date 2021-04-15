import {
  FETCH_NEXT_POST_STARTED,
  FETCH_NEXT_POST_SUCCESS,
  FETCH_NEXT_POST_FAILURE,
  SHOW_PREVIOUS_POST,
  SHOW_NEXT_POST,
  SHOW_NEXT_SUBPOST,
  SHOW_PREVIOUS_SUBPOST,
} from '../actiontypes';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
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
    currentPost: null,
    previousPosts: {},
    nextPosts: [],
  },
  loading: false,
  error: null,
};

const api = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NEXT_POST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NEXT_POST_SUCCESS:
      console.log(FETCH_NEXT_POST_SUCCESS);
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          previousPosts: [
            ...state.currentSubreddit.previousPosts,
            state.currentSubreddit.currentPost,
          ],
          currentPost: action.payload.filteredPostsArray,
          after: action.payload.after,
        },
        loading: false,
        error: null,
      };
    case FETCH_NEXT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SHOW_PREVIOUS_POST:
      console.log('SHOW_PREVIOUS_POST');
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          previousPosts: state.currentSubreddit.previousPosts.slice(0, -1),
          currentPost:
            state.currentSubreddit.previousPosts[
              state.currentSubreddit.previousPosts.length - 1
            ],
          nextPosts: [
            ...state.currentSubreddit.nextPosts,
            state.currentSubreddit.currentPost,
          ],
        },
      };
    case SHOW_NEXT_POST:
      console.log('SHOW_NEXT_POST');
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          previousPosts: [
            ...state.currentSubreddit.previousPosts,
            state.currentSubreddit.currentPost,
          ],
          currentPost:
            state.currentSubreddit.nextPosts[
              state.currentSubreddit.nextPosts.length - 1
            ],
          nextPosts: state.currentSubreddit.nextPosts.slice(0, -1),
        },
      };
    case SHOW_NEXT_SUBPOST:
      console.log(SHOW_NEXT_SUBPOST);
      // console.log(state.currentSubreddit.currentPost);
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          currentPost: state.currentSubreddit.currentPost.map((el) => {
            return el.active > 0 ? { active: el.active + 1 } : el;
          }),
        },
      };

    case SHOW_PREVIOUS_SUBPOST:
      console.log('SHOW_PREVIOUS_SUBPOST');
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          currentPost: state.currentSubreddit.currentPost.map((el) => {
            return el.active ? { active: el.active - 1 } : el;
          }),
        },
      };
    default:
      return state;
  }
};

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({ api, ui });

export default rootReducer;
