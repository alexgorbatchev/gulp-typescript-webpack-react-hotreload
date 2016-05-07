import { expect } from 'chai';
import { IPost, IAuthor, IPostsState, IPostsJSON, postsReducer, receivePosts, requestPosts } from './';

describe('posts / reducer', () => {
  it('handles REQUEST_POSTS', () =>
    expect(postsReducer(undefined, requestPosts())).to.eql({
      entities: {
        posts: {},
        authors: {},
      },
      result: [],
      isFetching: true,
    })
  );

  it('handles RECEIVE_POSTS', () => {
    const author: IAuthor = {
      id: 'author1',
      name: 'Alex',
      email: 'alex@www.com',
    };

    const post: IPost = {
      id: 'post1',
      title: 'Post title...',
      body: 'Post body...',
      author: author.id,
    };

    const state: IPostsState = {
      entities: {
        posts: {},
        authors: {},
      },
      result: [],
      isFetching: true,
    };

    const json: IPostsJSON = {
      data: [Object.assign({}, post, { author })],
    };

    expect(postsReducer(state, receivePosts(json))).to.eql({
      isFetching: false,
      entities: {
        posts: {
          [post.id]: post,
        },
        authors: {
          [author.id]: author,
        },
      },
      result: [post.id],
    });
  });
});
