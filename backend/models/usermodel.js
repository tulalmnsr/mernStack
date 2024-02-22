// userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  bookings: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Reference to the Movie model
        required: true,
      },
      showtime: {
        type: Date,
        required: true,
      },
      seats: [
        {
          type: String,
          required: true,
        },
      ],
      status: {
        type: String,
        required: true,
      },
      payment: {
        method: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    },
  ],
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
