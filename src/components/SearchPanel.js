import React from 'react';
import { connect } from 'react-redux';
import {
  changeSearchTerm,
  changeSubreddit,
  checkIfSubredditIsOk,
  fetchNextPost,
  getListOfSubreddits,
  hideSearchResults,
} from '../actions';
import Results from './Results';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let cValue = '';

    if (value.includes('+')) {
      cValue = value.split('+');
      cValue = cValue[cValue.length - 1];
    }

    this.props.dispatch(changeSearchTerm(value));
    if (!cValue) {
      this.props.dispatch(getListOfSubreddits(value));
    } else {
      this.props.dispatch(getListOfSubreddits(cValue));
    }

    if (value && (e.key === 'Enter' || e.keyCode === 13)) {
      this.props.dispatch(checkIfSubredditIsOk(`/r/${value.trim()}/`));
    }
  }

  toggleHeader() {
    let d = document.getElementById('search').style.display;

    if(d == 'flex' || d == '') {
      document.getElementById('search').style.display = "none";
      document.getElementById('sort').style.display = 'none';
    } else {
      document.getElementById('search').style.display = "flex";
      document.getElementById('sort').style.display = 'inline';
    }




    // document.location.reload();
  }

  // componentDidMount() {
  //   console.log('SearchPanel:CDM', this.state);
  // }

  // componentDidUpdate() {
  //   console.log('SearchPanel:CDU', this.state);
  // }

  // componentWillUnmount() {
  //   console.log('SearchPanel:CWU', this.state);
  // }

  render() {
    // console.log(this.props.api.search);
    return (
      <React.Fragment>
        <button
          id="menubtn"
          className={`menubtn ${
            this.props.api.visibilityOfElements.searchPanel ? '' : 'hidden'
          }`}
          onClick={this.toggleHeader}
        >
          <img src="./images/icon.png" className="menuimg" id="menuImg" />
        </button>

        <input
          id="search"
          className={`search ${
            this.props.api.visibilityOfElements.searchPanel ? '' : 'hidden'
          }`}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(SearchPanel);
