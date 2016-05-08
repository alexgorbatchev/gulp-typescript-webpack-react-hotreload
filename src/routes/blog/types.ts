import { IPost, IAuthor } from '../../store';

export interface IPostsProps {
  isFetching: boolean;
  posts: { [id: string]: IPost };
  authors: { [id: string]: IAuthor };
  displayPosts: string[];
}
