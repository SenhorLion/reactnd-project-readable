import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onAddPost, onDeletePost, fetchAllPosts } from '../actions';
import Category from '../components/category/Category';

const getPostsToShow = (posts, category) => {
  // debugger;
  if (category) {
    return Object.values(posts).filter(post => post.category === category);
  }

  return Object.values(posts);
};

const mapStateToProps = ({ posts, categories }, ownProps) => {
  const { category } = ownProps;

  return {
    posts: {
      isFetching: posts.isFetching,
      items: getPostsToShow(posts.items, category),
    },
    categories,
    category,
  };
};

// TODO: Can use bindActionCreators for actions here
// e.g bindActionCreators({
//   onAddPost,
//     fetchAllPosts,
//     onDeletePost,
// }, dispatch)
const CategoriesToShow = withRouter(
  connect(mapStateToProps, {
    onAddPost,
    fetchAllPosts,
    onDeletePost,
  })(Category)
);

export default CategoriesToShow;
