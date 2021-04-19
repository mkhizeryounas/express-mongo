import { Schema } from 'mongoose';

module.exports = (schema) =>
  new Schema(schema, {
    timestamps: true,
    strict: true,
  });
