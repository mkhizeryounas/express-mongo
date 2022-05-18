import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

module.exports = (schema) => {
  const schemaDefinition = new Schema(schema, {
    timestamps: true,
    strict: true,
  });
  schemaDefinition.plugin(mongoosePaginate);
  return schemaDefinition;
};
