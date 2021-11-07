const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// LOGIN route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// SIGNUP route
router.get("/signup", (req, res) => {
  res.render("signup");
});

// DASHBOARD route
router.get("/dashboard", withAuth, async (req, res) => {
  console.log("Dashboard route entered");

  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    console.log(postData);

    if (!postData) {
      res.status(400).json({ message: "There are no posts here yet" });
      return;
    }

    const posts = postData.map((data) => data.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DASHBOARD EDIT route
router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
  console.log("Dashboard Edit route entered");
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    console.log(postData);

    if (!postData) {
      res.status(400).json({ message: "There are no posts here yet" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("update-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// NEW POST route
router.get("/dashboard/new", (req, res) => {
  res.render("create-post", { loggedIn: true });
});

// POST ID route
router.get("/:id", async (req, res) => {
  console.log("Post by ID route entered");
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "post_content", "created_at"],
      // attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: Comment,
          // attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    console.log(postData);
    // serialize the data
    const post = postData.get({ plain: true });
    console.log(post);

    // pass data to template
    res.render("post", {
      post,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// HOMEPAGE route
router.get("/", async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postsData = await Post.findAll({
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postsData.map((post) => post.get({ plain: true }));

    // res.json(posts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
