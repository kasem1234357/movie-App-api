const mongoose = require('mongoose');
const tvShowSchema = new mongoose.Schema({
    title: { type: String, required: true },         // Title of the TV show
    description: { type: String },                   // Description of the TV show
    genre: [{ type: String }],                       // List of genres (e.g., Drama, Comedy)
    releaseDate: { type: Date },                     // Release date of the TV show
    createdAt: { type: Date, default: Date.now },    // Timestamp for when the show entry was created
    updatedAt: { type: Date, default: Date.now }     // Timestamp for when the show entry was last updated
  });
  
  module.exports = mongoose.model('TVShow', tvShowSchema);
  