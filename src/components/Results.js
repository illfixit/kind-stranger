import React from "react";
import Result from "./Result";

const Results = (props) => {
  let results;
  if (props.resultsArray.length > 0) {
    results = props.resultsArray.map((element) => {
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
  }

  return results.length > 0 ? (
    <div id="results" className="results">
      {results}
    </div>
  ) : null;
};

export default Results;
