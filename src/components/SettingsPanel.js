import React from "react";
import { connect } from "react-redux";
import { hideSearchPanel } from "../actions";

const SettingsPanel = (props) => {
  // console.log("SettingsPanel!");
  // let settingsPanelVisible = props.api.visibilityOfComponents.settingsPanel;
  // let settingsPanelVisible = true;
  // return settingsPanelVisible ? null : (
  //   <img
  //     id="settingsIcon"
  //     class="icon"
  //     src="https://illfixit.github.io/kind-stranger/images/icon.png"
  //   />
  // );
  return null;
};

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps)(SettingsPanel);
