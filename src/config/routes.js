import express from 'express';
import indexRouter from '@/routes/index';
import usersRouter from '@/routes/users';
import uploadsRouter from '@/routes/uploads';

const router = express.Router();

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/uploads', uploadsRouter);

module.exports = router;
