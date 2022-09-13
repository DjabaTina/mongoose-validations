const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const { postRouter } = require("./modules/posts/post.route");
const { authRouter } = require("./modules/users/auth.route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("welcome to my server. use /posts to get all");
});

app.use("/auth", authRouter);
app.use("/posts", postRouter);

const start = async () => {
  await dbConnect();

  app.listen(4000, () => {
    console.log("server running on http://localhost:4000");
  });
};

start();
