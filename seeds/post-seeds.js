const { Post } = require("../models");

const postData = [
  {
    title: "Title 1",
    post_content: "Post 1",
    user_id: 3,
  },
  {
    title: "Title 2",
    post_content: "Post 2",
    user_id: 1,
  },
  {
    title: "Title 3",
    post_content: "Post 3",
    user_id: 2,
  },
  {
    title: "Title 4",
    post_content: "Post 4",
    user_id: 1,
  },
  {
    title: "Title 5",
    post_content: "Post 5",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
