import React from 'react';
import { connect } from 'react-redux';
import {
  fetchNextPost,
  showNextPost,
  showPreviousPost,
  showNextSubpost,
  showPreviousSubpost,
  changeMediaScale,
} from '../actions/index';
import { getPostInfo } from '../utils';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    this.comments = this.props.api.currentSubreddit;
    console.log('test comments:', this.comments);
    console.log('visibility:', this.props.api.visibilityOfElements.comments);

    // if (this.props.api.visibilityOfElements.comments === false) {
    //   document.getElementById('comments').style.display = 'none';
    //   document.getElementById('closeComments').style.display = 'none';
    // } else {
    //   document.getElementsById('comments').style.display = 'block';
    //   document.getElementById('closeComments').style.display = 'block';
    // }

    return (
      <div id="comments" className="comments">
        <div id="closeComments" className="closeComments">
          ^
        </div>
        Hello
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Comments);
