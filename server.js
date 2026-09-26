import app from './app.js';

import { PORT } from './src/config/env.js';

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});