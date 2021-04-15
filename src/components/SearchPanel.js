import React, { setState } from 'react';

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '', results: [] };
    this.handleInput = this.handleInput.bind(this);
    this.searchSubreddits = this.searchSubreddits.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;

    this.setState({
      searchTerm: value,
    });

    this.searchSubreddits(value);
  }

  searchSubreddits(s) {
    fetch(
      `https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${s}&raw_json=1&gilding_detail=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let results = data.data.children.filter(
          (r) => typeof r.data.url === 'string'
        );
        this.setState({ results });
      })
      .catch((e) => {});
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
    return (
      <React.Fragment>
        <button id="menubtn" className="menubtn hidden">
          <img src="./images/icon.png" className="menuimg" id="menuImg" />
        </button>

        <input
          id="search"
          className="search hidden"
          placeholder="Search..."
          onInput={(e) => {
            this.handleInput(e);
          }}
          value={this.state.searchTerm}
        />

        {this.state.results.length > 0 ? (
          <Results
            // key={
            //   this.state.results &&
            //   this.state.results.reduce((acc, el) => {
            //     console.log(acc);
            //     return acc + el.data.url;
            //   }, '')
            // }
            resultsArray={this.state.results}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };
  }

  // componentDidMount() {
  //   console.log('Results:CDM', this.state);
  // }

  // componentDidUpdate() {
  //   console.log('Results:CDU', this.state);
  // }

  // componentWillUnmount() {
  //   console.log('Results:CWU', this.state);
  // }

  showResults() {
    let results = this.props.resultsArray.map((element) => {
      let iconUrl = element.data.community_icon
        ? element.data.community_icon
        : element.data.icon_img ||
          `https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png`;

      return (
        <React.Fragment>
          <Result
            key={element.data.subscribers}
            url={element.data.url}
            iconUrl={iconUrl}
            numOfSubscribers={element.data.subscribers}
          />
        </React.Fragment>
      );
    });

    return results;
  }

  render() {
    return (
      <div id="results" className="results">
        {this.showResults()}
      </div>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    console.log(e.target.childNodes[1].data);
  }

  // componentDidMount() {
  //   console.log('Result:CDM', this.state);
  // }

  // componentDidUpdate() {
  //   console.log('Result:CDU', this.state);
  // }

  // componentWillUnmount() {
  //   console.log('Result:CWU', this.state);
  // }

  render() {
    return (
      <React.Fragment>
        <div className="result" onClick={this.clickHandler}>
          <img
            src={this.props.iconUrl}
            style={{
              width: '1.5rem',
              height: '1.5rem',
              marginRight: '0.5rem',
            }}
          />
          {this.props.url} -{' '}
          {new Intl.NumberFormat().format(this.props.numOfSubscribers)}{' '}
          subscribers
        </div>
      </React.Fragment>
    );
  }
}

{
  /* 
{element.data.url} - ${new Intl.NumberFormat().format(
   element.data.subscribers
 )} subscribers */
}
