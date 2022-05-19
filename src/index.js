import app from './app';
import logger from './utils/logger';

import { PORT } from './config/keys';

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
