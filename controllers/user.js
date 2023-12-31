import { handleError } from "../utils/errorHandeler";

const User = require("../models/User");
export const getUserByID = async (req, res) => {
  const userId = req.params.userId;
  const userName = req.query.userName;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ userName: userName });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return handleError(res, 401, `User not found ${err.message}`);
  }
};
