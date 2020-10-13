import './styles.scss';

import { IPost } from 'models';
import PostItem from '../postItem';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectAllPosts } from '@/redux-store/posts/selectors';
import uuid from 'uuid/v4';

interface IProps {
  readonly posts: IPost[];
}

const PostList: React.SFC<IProps> = ({ posts }) => (
  <React.Fragment>
    <h1>Posts</h1>
    {posts.map(post => (
      <PostItem post={post} key={uuid()} />
    ))}
  </React.Fragment>
);

const mapStateToProps = createSelector(
  selectAllPosts(),
  posts => ({ posts })
);

const withConnect = connect(mapStateToProps);

export default compose<IProps, IProps>(withConnect)(PostList);
