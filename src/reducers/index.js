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
} from '../actiontypes';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  currentSubreddit: {
    url: '/r/itookapicture/',
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
  search: {
    searchTerm: '',
    results: [],
    hidden: true,
  },
  visibilityOfElements: {
    welcomeModal: true,
    searchPanel: false,
    results: false,
    image: true,
    video: false,
    dots: false,
    description: false,
    menu: false,
    objectFit: 'cover',
  },
  preload: {
    subreddit: '/r/itookapicture/',
    after: '',
    preloaded: [],
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
      // console.log(FETCH_NEXT_POST_SUCCESS);
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
        search: {
          ...state.search,
          hidden: true,
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

    case UPDATE_CURRENT_SUBREDDIT_AFTER:
      // console.log('UPDATE_CURRENT_SUBREDDIT_AFTER', action.payload.after);
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          after: action.payload.after,
        },
      };

    case SHOW_CURRENT_POST:
      // console.log('SHOW_CURRENT_POST');
      return {
        ...state,
      };
    case SHOW_PREVIOUS_POST:
      // console.log('SHOW_PREVIOUS_POST');
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
      // console.log('SHOW_NEXT_POST');
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
      // console.log(SHOW_NEXT_SUBPOST);
      // // console.log(state.currentSubreddit.currentPost);
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          currentPost: state.currentSubreddit.currentPost.map((el) => {
            return el.active > 0 ? { ...el, active: el.active + 1 } : el;
          }),
        },
      };

    case SHOW_PREVIOUS_SUBPOST:
      // console.log('SHOW_PREVIOUS_SUBPOST');
      return {
        ...state,
        currentSubreddit: {
          ...state.currentSubreddit,
          currentPost: state.currentSubreddit.currentPost.map((el) => {
            return el.active ? { ...el, active: el.active - 1 } : el;
          }),
        },
      };

    case CHECK_IF_SUBREDDIT_IS_OK_STARTED:
      return {
        ...state,
        loading: true,
      };

    case CHECK_IF_SUBREDDIT_IS_OK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CHECK_IF_SUBREDDIT_IS_OK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CHANGE_SUBREDDIT:
      // console.log('CHANGE_SUBREDDIT', action.payload);
      return {
        ...state,
        previousSubreddit: { ...state.currentSubreddit },
        currentSubreddit: {
          url: action.payload.subreddit,
          after: '',
          sort: 'hot',
          currentPost: {},
          previousPosts: [],
          nextPosts: [],
        },
        search: {
          ...state.search,
          hidden: true,
        },
        preload: {
          subreddit: action.payload.subreddit,
          after: '',
          preloaded: [],
        },
      };
    case CHANGE_SEARCH_TERM:
      // console.log('CHANGE_SEARCH_TERM');
      return {
        ...state,
        search: {
          ...state.search,
          searchTerm: action.payload.searchTerm,
        },
      };
    case GET_LIST_OF_SUBREDDITS_STARTED:
      // // console.log('GET_LIST_OF_SUBREDDITS_STARTED');
      return state;
    case GET_LIST_OF_SUBREDDITS_FAILURE:
      // // console.log('GET_LIST_OF_SUBREDDITS_FAILURE');
      return state;
    case GET_LIST_OF_SUBREDDITS_SUCCESS:
      // // console.log('GET_LIST_OF_SUBREDDITS_SUCCESS');
      return state;
    case UPDATE_SEARCH_RESULTS:
      // console.log('UPDATE_SEARCH_RESULTS', action.payload);
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload,
          hidden: false,
        },
      };

    case HIDE_SEARCH_RESULTS:
      console.log('HIDE_SEARCH_RESULTS', action.payload);
      return {
        ...state,
        search: {
          ...state.search,
          searchTerm: action.payload,
          hidden: true,
        },
      };
    case SHOW_SEARCH_RESULTS:
      // console.log('SHOW_SEARCH_RESULTS');
      return {
        ...state,
        search: {
          ...state.search,
          hidden: false,
        },
      };

    case CHANGE_VISIBILITY:
      // console.log('CHANGE_VISIBILITY');
      return {
        ...state,
        visibilityOfElements: {
          welcomeModal: false,
          searchPanel: true,
          results: true,
          image: true,
          video: false,
          dots: true,
          description: true,
          menu: true,
        },
      };

    case CHANGE_PRELOAD_AFTER:
      // console.log('CHANGE_PRELOAD_AFTER', action.payload);
      return {
        ...state,
        preload: {
          ...state.preload,
          after: action.payload,
        },
      };

    case UPDATE_PRELOADED:
      // console.log('UPDATE_PRELOADED', action.payload);
      return {
        ...state,
        preload: {
          ...state.preload,
          preloaded: [...state.preload.preloaded, action.payload],
        },
      };

    case CHANGE_MEDIA_SCALE:
      return {
        ...state,
        visibilityOfElements: {
          ...state.visibilityOfElements,
          objectFit: action.payload,
        },
      };

    // default
    default:
      return state;
  }
};

const rootReducer = combineReducers({ api });

export default rootReducer;
