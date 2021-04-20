export const create = async ({ Model, args }) => {
  return Model.create(args);
};

export const list = async ({ Model, args = {}, query = {} }) => {
  return Model.paginate(query, args);
};

export const single = async ({ Model, id }) => {
  const args = {
    _id: id,
  };
  return Model.findOne(args);
};

export const update = async ({ Model, id, args }) => {
  const query = {
    _id: id,
  };
  return Model.findOneAndUpdate(query, args, { new: true });
};

export const remove = async ({ Model, id }) => {
  const args = {
    _id: id,
  };
  return Model.findOneAndRemove(args);
};

export const softDelete = async ({ Model, id }) => {
  const args = {
    _id: id,
  };
  return Model.delete(args);
};

export const restore = async ({ Model, id }) => {
  const args = {
    _id: id,
  };
  return Model.restore(args);
};
