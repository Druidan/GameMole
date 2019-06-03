const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  message: { 
    type: String,
    required: true
  },
});

const Notes = mongoose.model("Notes", NoteSchema);

// Export the Note model
module.exports = Notes;
