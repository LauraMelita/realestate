import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import propertyRouter from '#routes/property';
import { handleNotFound } from '#middlewares/notFound';
import { formatError, handleError } from '#middlewares/error';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use('/properties', propertyRouter);
app.all('*', handleNotFound);

app.use([formatError, handleError]);

export default app;
