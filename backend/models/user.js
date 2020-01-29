const {model, models, Schema} = require('mongoose');

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.findUsers = async function({nickname, email}) {
  return await this.find({$or: [{nickname}, {email}]});
};
userSchema.statics.findUserById = async function(id) {
  return await this.findById(id);
};
userSchema.statics.findOneUser = async function({email}) {
  return await this.findOne({email});
};
userSchema.statics.createUser = async function(user) {
  return await new this(user).save();
};
userSchema.statics.deleteAccount = async function(_id) {
  return await this.findOneAndRemove({_id});
};

const userModel = model('users', userSchema);

module.exports = models.users || userModel;