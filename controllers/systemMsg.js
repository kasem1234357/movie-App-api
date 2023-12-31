import { handleError } from "../utils/errorHandeler";
const SysMassege = require("../models/SystemMasseges");
const User = require("../models/User");
export const addPriveteMsg = async (req, res) => {
  try {
    // Destructure request body
    const { userId, type, textArea, title, createdAt, isPrivate } = req.body;

    // Create a new SysMassege instance
    const newSysMassege = new SysMassege({
      type,
      textArea,
      title,
      createdAt,
      isPrivate,
    });

    // Save the new SysMassege
    const sysMassege = await newSysMassege.save();

    // Find the user by ID
    const user = await User.findById(userId);

    // If the user doesn't exist, return an error
    if (!user) {
      return handleError(res, 401, "User not found");
    }

    // Create an object for private messages
    const privateMessage = {
      massege: sysMassege._id,
      isOpened: false,
    };

    // Push the private message to the user's privateMessages array
    await user.updateOne({ $push: { privateMessages: privateMessage } });

    // Return the sysMassege as a response
    res.status(200).json(sysMassege);
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
export const addGlobalMsg = async (req, res) => {
  try {
    // Destructure request body
    const { type, textArea, title, createdAt, isPrivate } = req.body;

    // Create a new SysMassege instance
    const newSysMassege = new SysMassege({
      type,
      textArea,
      title,
      createdAt,
      isPrivate,
    });

    // Save the new SysMassege
    const sysMassege = await newSysMassege.save();

    // Push the global message to all users
    await User.updateMany(
      {},
      {
        $push: {
          globalMessages: {
            MassegeId: sysMassege._id,
            isOpened: false,
          },
        },
      }
    );

    // Return the sysMassege as a response
    res.status(200).json(sysMassege);
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
