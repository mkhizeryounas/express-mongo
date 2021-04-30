import mongoose from 'mongoose';
import { isEmail } from 'validator';
import mongoosePaginate from 'mongoose-paginate-v2';
import common from '../utils/common';
import { ENUMS } from '../controllers/user/user.validator';
import mongooseDelete from 'mongoose-delete';
import Schema from '../utils/schema-builder';

const userSchema = Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    validate: [isEmail],
    required: true,
    unique: true,
    index: true,
  },
  password: { type: String, required: true, set: common.hash },
  scope: { type: String, default: 'USER', enum: ENUMS.SCOPES },
});

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

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseDelete);

module.exports = mongoose.model('User', userSchema);
