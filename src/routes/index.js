import express from 'express';

import usersRouter from '@/routes/users';
import uploadsRouter from '@/routes/uploads';

const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({
    data: {
      message: 'App service is running.',
    },
  });
});

router.use('/users', usersRouter);
router.use('/uploads', uploadsRouter);

module.exports = router;
