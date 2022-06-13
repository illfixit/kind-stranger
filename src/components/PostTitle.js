import React from 'react';

export default class PostTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log(this.props);

    return (
      <div className={`title ${this.props.titleVisibilityClass}`} id="title">
        {this.props.title.replace('&amp', '&').replace('&lt', '<').replace('&gt', '>')}<br/>
        
        <div id="subredditAndAuthor">r/{this.props.subreddit && this.props.subreddit}<br/> 
        u/{this.props.author}<br/>   
        </div>     

      </div>
    );
  }
}
