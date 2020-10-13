import './styles.scss';

import { Layout, PostList } from 'components';
import React, { FC, useEffect } from 'react';

import { IDispatchable } from 'models';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { fetchPosts } from '@/redux-store/posts/actions';

export const Posts: FC<IDispatchable> = ({ dispatch }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(fetchPosts());
  });

  return (
    <Layout title="List of Posts" description="This is the List of Posts Page">
      <PostList posts={[]} />
    </Layout>
  );
};

export default compose<IDispatchable, IDispatchable>(connect())(Posts);
