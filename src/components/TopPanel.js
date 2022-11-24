import React from "react";
import { connect } from "react-redux";
import { showSearchPanel, showSettingsPanel } from "../actions";

const TopPanel = (props) => {
  return (
    <div id="top-panel">
      <div id="top-panel-placeholder"></div>
      <img
        className="icon"
        src="https://illfixit.github.io/kind-stranger/images/search_icon.png"
        onClick={() => props.dispatch(showSearchPanel())}
      />
      <img
        className="icon"
        src="https://illfixit.github.io/kind-stranger/images/icon.png"
        onClick={() => props.dispatch(showSettingsPanel())}
      />
    </div>
  );
};

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(TopPanel);
