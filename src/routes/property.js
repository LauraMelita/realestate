import express from 'express';

import { getAllProperties } from '#controllers/property';

const router = express.Router();

router.route('/').get(getAllProperties);

export default router;
