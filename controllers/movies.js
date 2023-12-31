import { handleError } from "../utils/errorHandeler";

const User = require("../models/User");
export const addMovie = async (req, res) => {
  const userId = req.params.userId;
  const movie = req.body.data;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleError(res, 401, "User not found");
    } else {
      await user.updateOne({ $push: { favMovies: movie } });
      res.status(200).json(user);
    }
  } catch (err) {
    return handleError(res, 500, err.message);
  }
};
export const deleteMovie = async (req, res) => {
  const userId = req.params.userId;
  const movieId = req.body.movieId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleError(res, 401, "User not found");
    } else {
      let currentMovie = {};
      for (let el of user.favMovies) {
        if (el.id === movieId) {
          currentMovie = el;
          break;
        }
      }
      await user.updateOne({ $pull: { favMovies: currentMovie } });
      res.status(200).json("done");
    }
  } catch (err) {
    return handleError(res, 500, err.message);
  }
};
