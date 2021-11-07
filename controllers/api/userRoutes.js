const router = require("express").Router();
// imports user, post, and comment models to use with our routes
const { User, Post, Comment } = require("../../models");

// SIGN UP - Create user
router.post("/", async (req, res) => {
  console.log("signup user route entered");
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// LOGIN - Find username in DB and compare w/ associated password
router.post("/login", async (req, res) => {
  console.log("login user route entered");
  try {
    // Find User (try to) in DB with matching username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // If unsuccessfull, throw helpful error
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // If successfull,
    const validPassword = await userData.checkPassword(req.body.password);
    // const validPassword = req.body.password;

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("Logout user route entered");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
