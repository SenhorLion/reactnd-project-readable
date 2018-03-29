import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loading from 'react-loading';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';
import Button from '../button/Button';
import DeletePostModal from '../posts/DeletePostModal';

// const PostDetailView = ({ post, postId, onDeletePost }) => {
class PostDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeletePostModalOpen: false,
    };
  }

  openDeletePostModal = postId => {
    console.log('@ openDeletePostModal', postId);

    this.setState(() => ({
      isDeletePostModalOpen: true,
    }));
  };

  closeDeletePostModal = () => {
    console.log('@ closeDeletePostModal');

    this.setState(() => ({
      isDeletePostModalOpen: false,
    }));
  };

  goBack = () => {
    console.log(`goBack props: ${JSON.stringify(this.props)}`);

    const { history, post } = this.props;
    const { item: { category, id } } = post;

    console.log(`category: ${category} id: ${id}`);
    // return history.push(`/${category}`);
    return history.goBack();
  };

  render() {
    const { post, postId, onDeletePost } = this.props;
    const { isFetching, item } = post;
    const { isDeletePostModalOpen } = this.state;

    const categoryColour = getCategoryColour(item && item.category) || 'grey';
    const uiHeaderColour = classNames('ui header', categoryColour);
    const uiLabelColour = classNames('ui label', categoryColour);
    const userIcon = classNames('user big icon', categoryColour);
    const postCommentButton = classNames(
      'ui submit labeled icon button',
      categoryColour
    );

    const hasPost = !!item;

    return (
      <div className="page-content">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <a onClick={() => this.goBack()} className="back-link">
                  <i className="big arrow left icon" />
                </a>
              </div>
            </div>
            <div className="thirteen wide column">
              <div className="ui container content">
                {isFetching && (
                  <Loading
                    delay={200}
                    type="spokes"
                    color="#222"
                    className="loading"
                  />
                )}
                {!isFetching &&
                  hasPost && (
                    <div>
                      <div className="page-header">
                        <div className="page-header__title">
                          <h2 className={uiHeaderColour}>
                            {capitalize(item.title)}

                            <div className="sub header">
                              <span className={` author`}>
                                By {item.author}{' '}
                              </span>
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
                          <div className={uiLabelColour}>
                            <Link to={`/${item.category}`}>
                              {item.category}
                            </Link>
                          </div>
                          <div className={uiLabelColour}>
                            <i className="like icon" /> {item.voteScore}
                          </div>
                          <div className={uiLabelColour}>
                            <i className="comment alternate outline icon" />{' '}
                            {item.commentCount}
                          </div>

                          <Button
                            onClick={() => this.openDeletePostModal()}
                            className="ui mini right floated button"
                          >
                            <i className="trash icon" /> Delete post
                          </Button>

                          <Link
                            to={`/${item.category}/${item.id}/edit`}
                            className="ui mini right floated button button__link"
                          >
                            <i className="edit icon" /> Edit post
                          </Link>
                        </div>
                      </div>

                      <div className="ui comments post-comment">
                        <div className="post-comment__header">
                          <h3 className="post-comment__title">Comments</h3>
                        </div>
                        <div className="comment">
                          <a className="avatar">
                            <i className={userIcon} />
                          </a>
                          <div className="content">
                            <a className="author">Joe Henderson</a>
                            <div className="metadata">
                              <div className="date">1 day ago</div>
                            </div>
                            <div className="text">
                              <p>
                                The hours, minutes and seconds stand as visible
                                reminders that your effort put them all there.{' '}
                              </p>
                              <p>
                                Preserve until your next run, when the watch
                                lets you see how Impermanent your efforts are.
                              </p>
                            </div>
                            <div className="actions">
                              <a className="reply">Reply</a>
                            </div>
                          </div>
                        </div>

                        <form className="ui reply form">
                          <div className="field">
                            <textarea />
                          </div>
                          <div className={postCommentButton}>
                            <i className="icon edit" /> Add Comment
                          </div>
                        </form>
                      </div>
                    </div>
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
      </div>
    );
  }
}

export default PostDetailView;
