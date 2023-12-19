const User = require('../models/User');
const Exercise = require('../models/Exercise');

const exerciseController = {
  addExercise: async (req, res) => {
    try {
      const { description, duration, date } = req.body;
      const { _id } = req.params;

      let exerciseDate = date ? new Date(date) : new Date();

      const user = await User.findById(_id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newExercise = new Exercise({
        username: user.username,
        description,
        duration,
        date: exerciseDate
      });
      console.log(newExercise)

      await newExercise.save();

      user.log.push(newExercise);
      user.count = user.log.length;

      await user.save();

      res.status(201).json({
        username: user.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date.toDateString()
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error adding exercise'
      });
    }
  },

  getUserLogs: async (req, res) => {
    try {
      const { _id } = req.params;

      const user = await User.findById(_id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const { from, to, limit } = req.query;

      let logs = user.log;

      // Filter by dates
      if (from && to) {
        logs = logs.filter((exercise) =>
          exercise.date >= new Date(from) &&
          exercise.date <= new Date(to));
      }

      if (limit) {
        logs = logs.slice(0, parseInt(limit));
      }

      const validateLog = logs.map((exercise) => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      }));

      res.status(200).json({
        username: user.username,
        count: user.count,
        log: validateLog
      })

    } catch (error) {
      res.status(500).json({ error: 'Error getting user exercise log' });
    }
  }
}

module.exports = exerciseController;