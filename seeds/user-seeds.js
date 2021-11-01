const { User } = require("../models");

const userData = [
  {
    username: "bretpetersen",
    email: "bretpetersen82@gmail.com",
    password: "p@ssword1",
  },
  {
    username: "bretp",
    email: "bretpetersen@gmail.com",
    password: "p@ssword2",
  },
  {
    username: "bpete",
    email: "bretpetersen69@gmail.com",
    password: "p@ssword3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
