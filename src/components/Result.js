import React, { setState } from "react";
import { connect } from "react-redux";
import {
  checkIfSubredditIsOk,
  changeSearchTerm,
  hideSearchPanel,
  changeSubreddit,
} from "../actions";

const Result = (props) => {
  const clickHandler = (e) => {
    // console.log('result:', e.target.childNodes[1].data);

    let res = e.target.childNodes[1].data.slice(3, -1);
    // props.dispatch(changeSearchTerm(newValue));

    // console.log("res", res);
    props.dispatch(changeSearchTerm(res));
    props.dispatch(checkIfSubredditIsOk(res));
    props.dispatch(hideSearchPanel());

    // let res = e.target.childNodes[1].data;
    // if (!props.api.search.searchTerm.includes("+")) {
    //   props.dispatch(checkIfSubredditIsOk(res));
    // } else {
    //   // console.log('search term:', props.api.search.searchTerm);
    //   let valueArr = props.api.search.searchTerm.split("+");
    //   let newValue = valueArr
    //     .slice(0, -1)
    //     .join("+")
    //     .concat(`+${res.slice(3)}`);
    //   props.dispatch(changeSearchTerm(newValue));
    //   props.dispatch(checkIfSubredditIsOk(`/r/${newValue}`));
    // }
  };

  return (
    <React.Fragment>
      <div className="result" onClick={clickHandler}>
        <img
          src={props.iconUrl}
          style={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.5rem",
          }}
        />
        {props.url} - {new Intl.NumberFormat().format(props.numOfSubscribers)}{" "}
        subscribers
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Result);
