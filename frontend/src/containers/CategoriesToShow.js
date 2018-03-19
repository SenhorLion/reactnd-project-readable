import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Category from '../components/category/Category';

const getPostsToShow = (posts, category) => {
  if (category) {
    return Object.values(posts).filter(post => post.category === category);
  }

  return posts;
};

const mapStateToProps = ({ posts, categories }, ownProps) => {
  const { category } = ownProps;

  return {
    posts: getPostsToShow(posts, category),
    categories,
    category,
  };
};

const CategoriesToShow = withRouter(connect(mapStateToProps)(Category));

export default CategoriesToShow;
