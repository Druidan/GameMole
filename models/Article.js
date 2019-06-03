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
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note",
  }]
});

const Article = mongoose.model("article", ArticleSchema);

// Export the Article model
module.exports = Article;
