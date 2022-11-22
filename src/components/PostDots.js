import React from "react";
import { connect } from "react-redux";
import { changeVisibility } from "../actions";

export const PostDots = (props) => {
  let numberOfDots = props.numberOfSubPosts;
  let active = props.active;
  let dots = [];

  if (numberOfDots > 1) {
    dots = [...Array(numberOfDots)].map((e, i) => {
      if (i + 1 == active) {
        return (
          <span key={i} className="dot active">
            &#8226;
          </span>
        );
      }

      return (
        <span key={i} className="dot">
          &#8226;
        </span>
      );
    });
  }

  return (
    <div id="dots" className={`dots ${dots.length > 1 ? "" : "hidden"}`}>
      {dots}
    </div>
  );
};

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(PostDots);
