import { connect } from "react-redux";
import React from "react";
import { showSearchPanel, hideSearchPanel } from "../actions";

const SearchIcon = (props) => {
  //   console.log(props);
  const onClickHandler = () => {
    switch (props.onClick) {
      case "showSearchPanel":
        props.dispatch(showSearchPanel());
        break;

      case "hideSearchPanel":
        props.dispatch(hideSearchPanel());
        break;

      default:
        props.dispatch(hideSearchPanel());
        break;
    }
  };

  return (
    <img
      id="searchIcon"
      src="https://illfixit.github.io/kind-stranger/images/search_icon.png"
      class="icon"
      onClick={() => onClickHandler()}
    />
  );
};

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(SearchIcon);
