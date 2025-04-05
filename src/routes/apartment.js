import express from 'express';

import { getAllApartments } from '#controllers/apartment';

const router = express.Router();

router.route('/').get(getAllApartments);

export default router;
