import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loading from 'react-loading';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';
import Button from '../ui/button/Button';
import DeletePostModal from '../posts/DeletePostModal';
import DeleteCommentModal from '../comments/DeleteCommentModal';
import CommentsByPost from '../../containers/CommentsByPost';
import ReactionPosts from '../ui/reaction/ReactionPosts';
import NotificationMessage from '../ui/notification/NotificationMessage';

class PostDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeletePostModalOpen: false,
      isDeleteCommentModalOpen: false,
      commentIdToDelete: null,
    };
  }

  openDeletePostModal = postId => {
    this.setState(() => ({
      isDeletePostModalOpen: true,
    }));
  };

  closeDeletePostModal = () => {
    this.setState(() => ({
      isDeletePostModalOpen: false,
    }));
  };

  openDeleteCommentModal = commentId => {
    this.setState(() => ({
      isDeleteCommentModalOpen: true,
      commentIdToDelete: commentId,
    }));
  };

  closeDeleteCommentModal = () => {
    this.setState(() => ({
      isDeleteCommentModalOpen: false,
      commentIdToDelete: null,
    }));
  };

  onGoBack = () => {
    const { history } = this.props;

    return history.goBack();
  };

  render() {
    const { post, postId, onDeletePost } = this.props;
    const { isFetching, item } = post;
    const {
      isDeletePostModalOpen,
      isDeleteCommentModalOpen,
      commentIdToDelete,
    } = this.state;
    const categoryName =
      (item && item.category) || this.props.match.params.category;
    const categoryColour = getCategoryColour(categoryName);
    const uiHeaderColourClass = classNames('ui header', categoryColour);
    const uiLabelColourClass = classNames('ui label', categoryColour);

    const hasPostToShow = !isFetching && !!item;

    return (
      <div className="page-content post-detail-view">
        <div className="ui grid">
          <div className="row page-header post-detail-view__header">
            <div className="sixteen wide column">
              <div className="ui container categories">
                <a onClick={() => this.onGoBack()} className="back-link">
                  <i className="medium arrow left icon" /> Back
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="sixteen wide column">
              <div className="ui container content detail-view">
                {isFetching && (
                  <Loading
                    delay={200}
                    type="spokes"
                    color="#222"
                    className="loading"
                  />
                )}
                {hasPostToShow ? (
                  <div>
                    <div className="page-header">
                      <div className="page-header__title">
                        <h2 className={uiHeaderColourClass}>
                          {capitalize(item.title)}

                          <div className="sub header">
                            <span className={` author`}>By {item.author} </span>
                            <span className={` date`}>
                              <Moment fromNow>{item.timestamp}</Moment>
                            </span>
                          </div>
                        </h2>
                      </div>
                    </div>

                    <div className="post-content">
                      <div className="post-content__meta">
                        {/* Can add post meta here? */}
                      </div>
                      <div className="post-content__description">
                        <p>{item.body}</p>
                      </div>
                      <div className="post-content__extra extra">
                        <div className={uiLabelColourClass}>
                          <Link to={`/${item.category}`}>{item.category}</Link>
                        </div>
                        <div className={uiLabelColourClass}>
                          <i className="comment alternate icon" />{' '}
                          {item.commentCount}
                        </div>

                        <ReactionPosts
                          categoryColour={categoryColour}
                          itemId={item.id}
                          classNameProp="ui label"
                        />

                        <Link
                          to={`/${item.category}/${item.id}/edit`}
                          className="ui label right floated"
                        >
                          <i className="edit icon" /> Edit
                        </Link>

                        <Button
                          onClick={() => this.openDeletePostModal()}
                          className="ui label right floated"
                        >
                          <i className="trash icon" /> Delete
                        </Button>
                      </div>
                    </div>

                    <CommentsByPost
                      postId={item.id}
                      categoryColour={categoryColour}
                      openDeleteCommentModal={this.openDeleteCommentModal}
                    />
                  </div>
                ) : (
                  <NotificationMessage
                    message={`No post found for route: ${this.props.match.url}`}
                    categoryColour={categoryColour}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <DeletePostModal
          isDeletePostModalOpen={isDeletePostModalOpen}
          closeDeletePostModal={this.closeDeletePostModal}
          onDeletePost={onDeletePost}
          postIdToDelete={postId}
          goBack={true}
        />

        <DeleteCommentModal
          commentIdToDelete={commentIdToDelete}
          isDeleteCommentModalOpen={isDeleteCommentModalOpen}
          closeDeleteCommentModal={this.closeDeleteCommentModal}
          onDeleteComment={this.props.onDeleteComment}
          fetchAllPosts={this.props.fetchAllPosts}
        />
      </div>
    );
  }
}

export default PostDetailView;
