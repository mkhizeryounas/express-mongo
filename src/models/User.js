import mongoose from 'mongoose';
import { isEmail } from 'validator';
import common from '@/utils/common';
import { ENUMS } from '@/validators/user.validator';
import Schema from '@/utils/schema-builder';

const schemaDef = Schema({
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

schemaDef.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

schemaDef.methods.checkPassword = async function (password) {
  if (common.hash(password) === this.password) {
    return this;
  }
  throw { status: 401 };
};

module.exports = mongoose.model('User', schemaDef);
