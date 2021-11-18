import express from 'express';

import controller from '../controller/DeporController.js';

const { Router } = express;
const router = new Router();

const deporController = new controller();

router.get('/', deporController.getResult);
router.get('/scrap', deporController.scrapResult);

export default router;
