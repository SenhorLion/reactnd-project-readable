import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loading from 'react-loading';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';
import Button from '../button/Button';
import DeletePostModal from '../posts/DeletePostModal';
import CommentsToShow from '../../containers/CommentsToShow';

class PostDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeletePostModalOpen: false,
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

  goBack = () => {
    const { history, post } = this.props;
    const { item: { category, id } } = post;

    // return history.push(`/${category}`);
    return history.goBack();
  };

  render() {
    const { post, postId, onDeletePost } = this.props;
    const { isFetching, item } = post;
    const { isDeletePostModalOpen } = this.state;

    const categoryColour = getCategoryColour(item && item.category) || 'grey';
    const uiHeaderColourClass = classNames('ui header', categoryColour);
    const uiLabelColourClass = classNames('ui label', categoryColour);

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
                          <h2 className={uiHeaderColourClass}>
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
                          <div className={uiLabelColourClass}>
                            <Link to={`/${item.category}`}>
                              {item.category}
                            </Link>
                          </div>
                          <div className={uiLabelColourClass}>
                            <i className="like icon" /> {item.voteScore}
                          </div>
                          <div className={uiLabelColourClass}>
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

                      <CommentsToShow
                        postId={item.id}
                        categoryColour={categoryColour}
                      />
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
