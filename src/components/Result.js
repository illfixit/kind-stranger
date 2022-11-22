import React, { setState } from "react";
import { connect } from "react-redux";
import { checkIfSubredditIsOk, changeSearchTerm } from "../actions";

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    // console.log('result:', e.target.childNodes[1].data);

    let res = e.target.childNodes[1].data;
    if (!this.props.api.search.searchTerm.includes("+")) {
      this.props.dispatch(checkIfSubredditIsOk(res));
    } else {
      // console.log('search term:', this.props.api.search.searchTerm);
      let valueArr = this.props.api.search.searchTerm.split("+");
      let newValue = valueArr
        .slice(0, -1)
        .join("+")
        .concat(`+${res.slice(3)}`);
      this.props.dispatch(changeSearchTerm(newValue));
      this.props.dispatch(checkIfSubredditIsOk(`/r/${newValue}`));
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="result" onClick={this.clickHandler}>
          <img
            src={this.props.iconUrl}
            style={{
              width: "1.5rem",
              height: "1.5rem",
              marginRight: "0.5rem",
            }}
          />
          {this.props.url} -{" "}
          {new Intl.NumberFormat().format(this.props.numOfSubscribers)}{" "}
          subscribers
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Result);
