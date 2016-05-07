import { expect } from 'chai';
import { REQUEST_POSTS, RECEIVE_POSTS, requestPosts, receivePosts } from './';

describe('posts / actions', () => {
  it('requestPosts', () =>
    expect(requestPosts()).to.eql({
      type: REQUEST_POSTS
    })
  );

  it('receivePosts', () =>
    expect(receivePosts({ data: [] })).to.eql({
      type: RECEIVE_POSTS,
      payload: { data: [] }
    })
  );
});
