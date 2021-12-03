import express from 'express';
import indexRouter from '../routes/index';
import usersRouter from '../routes/users';
import batchesRouter from '../routes/batches';

const router = express.Router();

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/batches', batchesRouter);

module.exports = router;
