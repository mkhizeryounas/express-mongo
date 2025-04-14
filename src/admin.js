import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import mongoose from 'mongoose';
import { SECRET, MONGO_CONNECTION_STRING, NODE_ENV } from '@/config/keys';
import { User } from '@/models';
import { name as appName } from '../package.json';
import MongoStore from 'connect-mongo';

const sessionStore = new MongoStore({
  mongoUrl: MONGO_CONNECTION_STRING,
  collectionName: 'adminjs_sessions',
});

const AdminJSMongooseModule = await import('@adminjs/mongoose');

const { Database, Resource } = AdminJSMongooseModule;

AdminJS.registerAdapter({ Database, Resource });
const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    companyName: `${appName.toUpperCase()} | Admin`,
    softwareBrothers: false,
    logo: 'https://gozigzag.sfo3.digitaloceanspaces.com/uploads/2025-04-14/646daa70-f302-413f-b574-9c5e6d2de7aa.png',
  },
});
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email, password });
      if (user) {
        return user;
      }
      return null;
    },
    cookiePassword: SECRET,
  },
  null,
  {
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  }
);

export { adminJs, adminRouter };
