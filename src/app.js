import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import routes from '#routes/index';
import { handleNotFound } from '#middlewares/notFound';
import { formatError, handleError } from '#middlewares/error';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', routes);
app.all('*', handleNotFound);

app.use([formatError, handleError]);

export default app;
