import * as React from 'react';
import { IPost, IAuthor } from '../../../store';

export default function PostComponent(post: IPost) {
  const author: IAuthor = post.author as IAuthor;

  return (
    <div>
      <h3>{post.title}</h3>
      <div>by {author.name} &lt; {author.email}&gt; </div>
      <div>{post.body}</div>
    </div>
  );
}
