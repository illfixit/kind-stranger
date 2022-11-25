import React from "react";

const PostMeta = (props) => {
  return (
    <div id="subredditAndAuthor">
      r/{props.subreddit}
      <br />
      u/{props.author}
      <br />
    </div>
  );
};

export default PostMeta;
