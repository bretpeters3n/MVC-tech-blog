const { User } = require("../models");

const userData = [
  {
    username: "bretpetersen",
    password: "p@ssword1",
  },
  {
    username: "bretp",
    password: "p@ssword2",
  },
  {
    username: "bpete",
    password: "p@ssword3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
