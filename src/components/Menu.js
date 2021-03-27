import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="menu-close" className="menu-close"></div>
        <div id="menu" className="menu">
          <div className="toggle-button-container">
            <label htmlFor="toggle-button" className="toggle-button-text">
              Slide Show
            </label>
            <input
              type="checkbox"
              id="slideshow-toggle-button"
              className="toggle-button"
            />
          </div>

          <div className="toggle-button-container">
            <label htmlFor="toggle-button" className="toggle-button-text">
              Night Mode
            </label>
            <input
              type="checkbox"
              id="toggle-button"
              className="toggle-button"
            />
          </div>
          <br />
          <div className="slider-text hidden" id="slider-text">
            Intensity of Night Mode
          </div>
          <input
            type="range"
            min="30"
            max="80"
            defaultValue="70"
            className="slider hidden"
            id="range"
          />
        </div>
      </React.Fragment>
    );
  }
}
