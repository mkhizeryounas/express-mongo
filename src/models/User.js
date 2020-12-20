import mongoose from 'mongoose';
import { isEmail } from 'validator';
import common from '../utils/common';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      validate: [isEmail],
      required: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, set: common.hash },
  },
  {
    timestamps: true,
    strict: true,
  }
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.checkPassword = async function (password) {
  if (common.hash(password) === this.password) {
    console.log(this);
    return this;
  }
  throw { status: 401 };
};

module.exports = mongoose.model('User', userSchema);
