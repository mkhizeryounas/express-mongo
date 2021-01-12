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

  return User.create(args);
};

export const signin = async ({ email, password }) => {
  const args = {
    email,
    password,
  };
  const user = await User.findOne(args);

  return lock(user.toJSON());
};
