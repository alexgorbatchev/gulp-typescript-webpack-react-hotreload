import * as React from 'react';
import { connect } from 'react-redux';
import Blog from '../components/BlogComponent';
import { IState } from '../../../store';
import { IPostsProps } from '../types';

function stateToProps(state: IState, ownProps: any): IPostsProps {
  return { posts: state.posts };
}

@connect(stateToProps)
export default class BlogContainer extends React.Component<IPostsProps, any> {
  render() {
    return <Blog {...this.props} />;
  }
}
