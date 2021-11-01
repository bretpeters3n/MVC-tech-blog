const { Comment } = require("../models");

const commentData = [
  {
    user_id: 3,
    post_id: 2,
    comment_text: "This is amazing!",
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: "Wow, amazing work!",
  },
  {
    user_id: 1,
    post_id: 3,
    comment_text: "Awesome! kudos to everyone who have contributed",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
