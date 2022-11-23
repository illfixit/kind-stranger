import React from "react";
import { connect } from "react-redux";
import { showSearchPanel, hideSearchPanel } from "../actions";
import SearchPanel from "./SearchPanel";

export const TopPanel = (props) => {
  let searchPanelVisible = props.api.visibilityOfElements.searchPanel;
  let settingsPanelVisible = props.api.visibilityOfElements.settingsPanel;

  const toggleSearchPanel = () => {
    // console.log("TopPanel::toggleSearchPanel");

    searchPanelVisible === true
      ? props.dispatch(hideSearchPanel())
      : props.dispatch(showSearchPanel());

    searchPanelVisible = props.api.visibilityOfElements.searchPanel;
  };

  return (
    <React.Fragment>
      {searchPanelVisible === true ? <SearchPanel /> : null}
      <img
        id="searchIcon"
        onClick={toggleSearchPanel}
        src="https://illfixit.github.io/kind-stranger/images/search_icon.png"
      />
      {settingsPanelVisible === true ? <SettingsPanel /> : null}
      <img
        id="settingsIcon"
        src="https://illfixit.github.io/kind-stranger/images/icon.png"
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(TopPanel);
