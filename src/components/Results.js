import React from "react";
import Result from "./Result";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };
  }

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
    let classes = "results";
    if (this.props.hidden) {
      classes = "results hidden";
    }
    return (
      <div id="results" className={classes}>
        {this.showResults()}
      </div>
    );
  }
}
