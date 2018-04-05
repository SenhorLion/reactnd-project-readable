const clone = require('clone');

let db = {};

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1521130539403,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0,
  },
  cjeh8jin1000hOK__f5ojlsdg: {
    id: 'cjeh8jin1000hOK__f5ojlsdg',
    timestamp: 1520436201551,
    title: 'Internationalize your React Redux app with React Intl',
    body:
      'It is common to construct a website for different countries. You have to be capable of translating the text but also you have to display your number and your date in the format used by the country. We have found a library that take care of this.',
    author: 'lionel',
    category: 'udacity',
    voteScore: 42,
    deleted: false,
    commentCount: 0,
  },
  cjeh8jin1000hOK__f5ojzaza: {
    id: 'cjeh8jin1000hOK__f5ojzaza',
    timestamp: 1521211198234,
    title: 'Actions',
    body:
      'Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().',
    author: 'lionel',
    category: 'test',
    voteScore: 1,
    deleted: false,
    commentCount: 0,
  },
  cjeh8jin1000hOK__f5ojzazz: {
    id: 'cjeh8jin1000hOK__f5ojzazz',
    timestamp: 1521208197974,
    title: 'Action Creators',
    body: `Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.`,
    author: 'lionel',
    category: 'redux',
    voteScore: 1,
    deleted: false,
    commentCount: 0,
  },
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted
    );
    res(filtered_keys.map(key => posts[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token);
    res(posts[id].deleted ? {} : posts[id]);
  });
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(key => !posts[key].deleted);
    res(filtered_keys.map(key => posts[key]));
  });
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token);

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0,
    };

    res(posts[post.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token);
    post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`);
    }
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token);
    posts[id].deleted = true;
    res(posts[id]);
  });
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token);
    for (prop in post) {
      posts[id][prop] = post[prop];
    }
    res(posts[id]);
  });
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token);
  if (data[id]) {
    data[id].commentCount += count;
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  incrementCommentCounter,
};
