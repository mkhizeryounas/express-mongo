const mongoose = require("mongoose"),
  db = require("../config/db");
const { isEmail } = require("validator");
const common = require("../src/modules/common");

var Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      validate: [isEmail],
      required: true,
      dropDups: true
    },
    password: { type: String, required: true, set: common.hash }
  },
  {
    timestamps: true
  }
);

Schema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

Schema.methods.checkPassword = async function(password) {
  if (common.hash(password) === this.password) {
    console.log(this);
    return this;
  }
  throw { status: 401 };
};

module.exports = db.model("User", Schema);
