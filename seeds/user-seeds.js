const { User } = require("../models");

const userData = [
  {
    username: "bretpetersen",
    password: "bret1234",
  },
  {
    username: "bpetersen",
    password: "bret1234",
  },
  {
    username: "bpete",
    password: "bret1234",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
