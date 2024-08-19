const mongoose = require('mongoose');
const episodeSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TVShow",
    required: true,
  }, // Reference to the TV show
  seasonNumber: { type: Number, required: true }, // Season number
  episodeNumber: { type: Number, required: true }, // Episode number
  title: { type: String }, // Title of the episode
  description: { type: String }, // Description of the episode
  releaseDate: { type: Date }, // Release date of the episode
  duration: { type: Number }, // Duration of the episode in minutes
  downloadLinks: [
    {
      quality: { type: String, required: true }, // Quality of the download link (e.g., 720p, 1080p)
      url: { type: String, required: true }, // URL of the download link
      size: { type: String }, // File size (e.g., "1.5GB")
      format: { type: String }, // File format (e.g., "MP4", "MKV")
      addedAt: { type: Date, default: Date.now }, // Timestamp for when the link was added
    },
  ],
});

module.exports = mongoose.model("Episode", episodeSchema);
