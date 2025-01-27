import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import morgan from 'morgan';
import helmet from 'helmet';
import {app} from './app';
import DatabaseManager from './data-source';
import NacosManager from './helpers/nacosManager';

NacosManager.init()
.then(async () => {
  const config = NacosManager.getConfig();
  if (config.NODE_ENV === 'production') {
    app.use(helmet());
  } else {
    app.use(morgan('dev'));
  }

  await DatabaseManager.initialize(config);
  return app.listen(config.PORT, async () =>
    console.log(`Example app listening at http://localhost:${config.PORT}`),
  );
}).catch(error => {
  console.log("🚀 ~ .then ~ error:", error)
});
