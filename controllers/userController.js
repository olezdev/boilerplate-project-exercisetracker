const User = require('../models/User');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username } = req.body;

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({
          error: "User already exists"
        })
      }

      const newUser = new User({ username });
      await newUser.save();

      res.status(201).json({
        username: newUser.username,
        _id: newUser._id
      });

    } catch (error) {
      res.status(500).json({ error: 'Error creating user' })
    }
  }
};

module.exports = userController;