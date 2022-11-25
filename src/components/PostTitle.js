import React from "react";

const PostTitle = (props) => {
  return (
    <div className="title" id="title">
      {props.title.replace("&amp", "&").replace("&lt", "<").replace("&gt", ">")}
      <br />
    </div>
  );
};

export default PostTitle;
