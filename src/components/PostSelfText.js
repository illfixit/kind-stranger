import React from "react";

const PostSelfText = (props) => {
  return (
    <div className="selftext" id="selftext">
      <b>{props.title}</b>
      <br />
      <br />
      {props.selftext.length > 300
        ? `${props.selftext.slice(0, 300).replace("&amp", "&")}...`
        : props.selftext.slice(0, 300).replace("&amp", "&")}
    </div>
  );
};

export default PostSelfText;
