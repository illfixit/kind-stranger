import React from "react";
import { connect } from "react-redux";
import {
  changeSearchTerm,
  changeSubreddit,
  changeVisibility,
  checkIfSubredditIsOk,
  fetchNextPost,
  getListOfSubreddits,
  hideSearchPanel,
} from "../actions";
import Results from "./Results";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let cValue = "";

    if (value.includes("+")) {
      cValue = value.split("+");
      cValue = cValue[cValue.length - 1];
    }

    this.props.dispatch(changeSearchTerm(value));
    if (!cValue) {
      this.props.dispatch(getListOfSubreddits(value));
    } else {
      this.props.dispatch(getListOfSubreddits(cValue));
    }

    if (value && (e.key === "Enter" || e.keyCode === 13)) {
      // console.log("hide search panel pleasee");
      this.props.dispatch(checkIfSubredditIsOk(`/r/${value.trim()}/`));
      this.props.dispatch(hideSearchPanel());
    }
  }

  render() {
    // console.log(this.props.api.search);
    return (
      <div id="search-window">
        {/* <button id="close-search-panel">&#60;</button> */}
        <input
          id="search-panel"
          className="search-panel"
          placeholder="Search..."
          onInput={(e) => {
            this.handleInput(e);
          }}
          onKeyUp={(e) => {
            this.handleInput(e);
          }}
          value={this.props.api.search.searchTerm}
          // autocomplete="off"
          // spellcheck="false"
        />

        {this.props.api.search.results &&
        this.props.api.search.results.length > 0 ? (
          <Results
            // key={
            //   this.state.results &&
            //   this.state.results.reduce((acc, el) => {
            //     console.log(acc);
            //     return acc + el.data.url;
            //   }, '')
            // }
            hidden={this.props.api.search.hidden}
            resultsArray={this.props.api.search.results}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(SearchPanel);
