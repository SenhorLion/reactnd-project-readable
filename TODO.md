# Todos in project

## UI Frontend

### Add new post

* When new post is a different category it should navigate to that new posts category NOT the existing one
  * instead of `history.back` use `history.push('/${category}/${postId})`
