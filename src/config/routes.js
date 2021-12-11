import express from 'express';
import indexRouter from '../routes/index';
import usersRouter from '../routes/users';

const router = express.Router();

router.use('/', indexRouter);
router.use('/users', usersRouter);

module.exports = router;
