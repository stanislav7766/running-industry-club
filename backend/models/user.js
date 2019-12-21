'use strict';
const { model, models, Schema } = require('mongoose');

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.statics.findUser = async function({ nickname, email }) {
  return await this.find({ $or: [{ nickname }, { email }] });
};
userSchema.statics.createUser = async function(user) {
  return await new this(user).save();
};

const userModel = model('users', userSchema);

module.exports = models.users || userModel;
