import React, { Component } from 'react';
import Loading from 'react-loading';
import EditFormControl from './EditFormControl';

class PostEditView extends Component {
  onGoBack = () => {
    const { history, post } = this.props;
    const { item: { category, id } } = post;

    console.log(`category: ${category} id: ${id}`);

    // NOTE: Is it better to go back to `category/:id` or just history.back ?
    // history.push(`/${category}`);
    // history.push(`/${category}/${id}`);
    history.goBack();
  };

  render() {
    const {
      post,
      categories,
      fetchAllPosts,
      onSaveEditPost,
      history,
    } = this.props;
    const { isFetching, item } = post;

    const hasPost = !!item;

    return (
      <div className="page-content">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <a onClick={() => this.onGoBack()} className="back-link">
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
                    <div className="post-details-form">
                      <EditFormControl
                        history={history}
                        categories={categories}
                        onSaveEditPost={onSaveEditPost}
                        fetchAllPosts={fetchAllPosts}
                        post={item}
                        type="edit"
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostEditView;
