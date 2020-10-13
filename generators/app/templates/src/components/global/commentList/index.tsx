import './styles.scss';

import CommentItem from './../commentItem';
import { IComment } from 'models';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectSelectedPostComments } from '@/redux-store/posts/selectors';
import uuid from 'uuid/v4';

interface IProps {
  readonly comments: IComment[];
}

const CommentList: React.SFC<IProps> = ({ comments }) => {
  return (
    <React.Fragment>
      {comments.length > 0 && (
        <React.Fragment>
          <h3>Comments</h3>
          {comments.map(comment => (
            <CommentItem comment={comment} key={uuid()} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = createSelector(
  selectSelectedPostComments(),
  comments => ({ comments })
);

const withConnect = connect(mapStateToProps);

export default compose<IProps, IProps>(withConnect)(CommentList);
