const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  sourceRef: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
    default: null
  }
});

const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
