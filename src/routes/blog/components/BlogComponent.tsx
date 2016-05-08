import * as React from 'react';
import Banner, { BannerKind } from '../../../components/BannerComponent';
import { IPostsProps } from '../types';
import Post from './PostComponent';

export default class BlogComponent extends React.Component<IPostsProps, any> {
  render() {
    const { posts, authors } = this.props.posts.entities;
    const { isFetching, result: displayPosts } = this.props.posts;

    return (
      <div>
        <h2>Blog</h2>
        <Banner kind={BannerKind.warning} />
        {isFetching
          ? 'Loading...'
          : displayPosts.map(postId =>
            <Post {...posts[postId]} author={authors[posts[postId].author as string]} />
          )
        }
      </div>
    );
  }
}
