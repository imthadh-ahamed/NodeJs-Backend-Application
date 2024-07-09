import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    const user = new User({ email, location });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

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
