import { User } from '../../models';
import { lock } from '../../utils/locker';

export const create = async (
  { name, email, password, scope = 'USER' },
  isAdmin = false
) => {
  const args = {
    name,
    email,
    password,
    scope,
  };
  const count = await User.countDocuments();

  if (count === 0) {
    args.scope = 'ADMIN';
  } else if (!isAdmin) {
    args.scope = 'USER';
  }

  const isDuplicateUser = await User.findOne({ email });

  if (!isDuplicateUser) {
    return User.create(args);
  } else if (isDuplicateUser.deleted === true) {
    return isDuplicateUser.restore();
  } else {
    throw {
      status: 409,
      message: `An account with email '${email}' already exisits`,
    }; // Duplicate
  }
};

export const signin = async ({ email, password }) => {
  const args = {
    email,
    password,
  };
  const user = await User.findOne(args);
  if (!user) {
    throw { status: 401 };
  }
  return lock(user.toJSON());
};
