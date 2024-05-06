import express from 'express';
import logout from '../controllers/logout.js';

const logoutRouter = express.Router();


logoutRouter.post('/', logout);


export default logoutRouter;
