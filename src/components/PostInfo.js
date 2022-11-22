import React from "react";
import PostDots from "./PostDots";
import PostTitle from "./PostTitle";

const PostInfo = (props) => {
  return (
    <div className="titleAndDots" id="titleAndDots">
      <PostDots
        numberOfSubPosts={props.numberOfSubPosts}
        active={props.active}
        // bottom={bottom}
      />

      <PostTitle
        titleVisibilityClass={props.titleVisibilityClass}
        title={props.title}
        subreddit={props.subreddit}
        author={props.author}
      />
    </div>
  );
};

export default PostInfo;
