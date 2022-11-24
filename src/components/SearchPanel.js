import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  changeSearchTerm,
  changeSubreddit,
  changeVisibility,
  checkIfSubredditIsOk,
  fetchNextPost,
  getListOfSubreddits,
  hideSearchPanel,
  showSearchPanel,
} from "../actions";
import Results from "./Results";

const SearchPanel = (props) => {
  let searchPanelVisible = props.api.visibilityOfComponents.searchPanel;
  if (props.api.visibilityOfComponents.settingsPanel) {
    props.dispatch(hideSettingsPanel());
  }

  let errorLoadingSubreddit = props.api.error;
  let shouldHidePanel = useRef(false);

  useEffect(() => {
    errorLoadingSubreddit = props.api.error;
    if (!props.api.loading) {
      if (errorLoadingSubreddit) {
        alert(`Subreddit ${props.api.search.searchTerm} doesn't exist`);
        errorLoadingSubreddit = false;
      }
      if (!errorLoadingSubreddit) {
        console.log(
          "errorLoadingSubreddit, shouldHidePanel",
          errorLoadingSubreddit,
          shouldHidePanel
        );
        if (shouldHidePanel) {
          setTimeout(() => {
            props.dispatch(hideSearchPanel());
            shouldHidePanel.current = false;
          }, 300);
        }
      }
    }
  }, [props.api.loading, props.api.error]);

  const checkSubredditAndHideSearchPanel = () => {
    if (props.api.search.searchTerm.trim()) {
      shouldHidePanel.current = true;
      props.dispatch(checkIfSubredditIsOk(props.api.search.searchTerm.trim()));
    }
  };

  const handleInput = (e) => {
    let value = e.target.value;
    let cValue = "";

    if (value.includes("+")) {
      cValue = value.split("+");
      cValue = cValue[cValue.length - 1];
    }

    props.dispatch(changeSearchTerm(value));
    if (!cValue) {
      props.dispatch(getListOfSubreddits(value));
    } else {
      props.dispatch(getListOfSubreddits(cValue));
    }

    if (value && (e.key === "Enter" || e.keyCode === 13)) {
      // console.log("hide search panel pleasee");
      checkSubredditAndHideSearchPanel();
    }
  };

  const cleanInput = () => {
    console.log("cleanInput");
    document.getElementById("search-panel").value = "";
    props.dispatch(changeSearchTerm(""));
    document.getElementById("search-panel").focus();
  };

  return searchPanelVisible ? (
    <div id="search-window">
      {/* <button id="close-search-panel">&#60;</button> */}
      <div id="search-panel">
        <span id="input-with-clean-icon">
          <input
            id="search-input"
            className="search-input"
            placeholder="Search..."
            onInput={(e) => {
              handleInput(e);
            }}
            onKeyUp={(e) => {
              handleInput(e);
            }}
            value={props.api.search.searchTerm}
            // autocomplete="off"
            // spellcheck="false"
          />
          <div
            id="cleanInputContainer"
            onClick={() => {
              props.dispatch(cleanInput());
            }}
          >
            <img
              id="cleanInputIcon"
              class="search-panel-icon"
              src="https://illfixit.github.io/kind-stranger/images/close_icon.png"
            />
          </div>
        </span>
        <img
          id="searchIcon"
          class="search-panel-icon"
          src="https://illfixit.github.io/kind-stranger/images/search_icon.png"
          onClick={() => checkSubredditAndHideSearchPanel()}
        />
        <img
          id="closeIcon"
          class="search-panel-icon"
          src="https://illfixit.github.io/kind-stranger/images/close_icon.png"
          onClick={() => {
            props.dispatch(hideSearchPanel());
          }}
        />
      </div>
      {props.api.search.results && props.api.search.results.length > 0 ? (
        <Results resultsArray={props.api.search.results} />
      ) : null}
    </div>
  ) : null;
};

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(SearchPanel);
