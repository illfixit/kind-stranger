import React, { setState } from 'react';
import { connect } from 'react-redux';
import { checkIfSubredditIsOk } from '../actions';

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    // console.log('result:', e.target.childNodes[1].data);
    this.props.dispatch(checkIfSubredditIsOk(e.target.childNodes[1].data));
  }

  // componentDidMount() {
  //   console.log('Result:CDM', this.state);
  // }

  // componentDidUpdate() {
  //   console.log('Result:CDU', this.state);
  // }

  // componentWillUnmount() {
  //   console.log('Result:CWU', this.state);
  // }

  render() {
    return (
      <React.Fragment>
        <div className="result" onClick={this.clickHandler}>
          <img
            src={this.props.iconUrl}
            style={{
              width: '1.5rem',
              height: '1.5rem',
              marginRight: '0.5rem',
            }}
          />
          {this.props.url} -{' '}
          {new Intl.NumberFormat().format(this.props.numOfSubscribers)}{' '}
          subscribers
        </div>
      </React.Fragment>
    );
  }
}

{
  /* 
{element.data.url} - ${new Intl.NumberFormat().format(
   element.data.subscribers
 )} subscribers */
}

const mapStateToProps = ({ api }) => {
  // console.log(api.currentSubreddit.currentPost[0]);
  return { api };
};

export default connect(mapStateToProps)(Result);
