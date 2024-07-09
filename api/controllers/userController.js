import User from "../models/User.js";

// Controller function to create a new user
export const createUser = async (req, res) => {
  // Extracting Email and Location from request body
  const { email, location } = req.body;
  try {
    const user = new User({ email, location });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Controller function to update user's location
export const updateUserLocation = async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { location },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
