import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  changeSearchTerm,
  checkIfSubredditIsOk,
  getListOfSubreddits,
  hideSearchPanel,
  hideSettingsPanel,
} from "../actions";
import Results from "./Results";

const SearchPanel = (props) => {
  let searchPanelVisible = props.api.visibilityOfComponents.searchPanel;
  if (props.api.visibilityOfComponents.settingsPanel) {
    props.dispatch(hideSettingsPanel());
  }

  let shouldHidePanel = useRef(false);

  useEffect(() => {
    // errorLoadingSubreddit = props.api.error;
    if (props.api.loading == false) {
      // console.log("props.api.loading == false");
      //
      if (props.api.error) {
        // console.log("props.api.error");
        alert(`Subreddit ${props.api.search.searchTerm} doesn't exist`);
        shouldHidePanel.current = false;
      }
      //
      if (!props.api.error) {
        // console.log("!props.api.error");

        if (shouldHidePanel.current) {
          setTimeout(() => {
            props.dispatch(hideSearchPanel());
            shouldHidePanel.current = false;
          }, 500);
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

    if (value && (e.key === "Enter" || e.keyCode === 13)) {
      // console.log("hide search panel pleasee");
      checkSubredditAndHideSearchPanel();
    } else {
      props.dispatch(changeSearchTerm(value));
      if (!cValue) {
        props.dispatch(getListOfSubreddits(value));
      } else {
        props.dispatch(getListOfSubreddits(cValue));
      }
    }
  };

  const cleanInput = () => {
    // console.log("cleanInput");
    document.getElementById("search-panel").value = "";
    props.dispatch(changeSearchTerm(""));
    document.getElementById("search-panel").focus();
  };

  return searchPanelVisible ? (
    <div id="search-window">
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
          <div id="cleanInputContainer" onClick={() => cleanInput()}>
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
