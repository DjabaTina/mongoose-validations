const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
  },

  body: {
    type: String,
    require: true,
    minLength: 10,
  },

  published: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("post", postSchema);
