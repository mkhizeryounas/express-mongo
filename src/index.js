import app from './app';

import { PORT } from './config/keys';

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
