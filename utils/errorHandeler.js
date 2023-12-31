// Create a reusable function to handle errors

export const handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  };
  