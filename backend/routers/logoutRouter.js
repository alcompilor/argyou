import express from 'express';
import logout from '../controllers/logout.js';

const logoutRouter = express.Router();


logoutRouter.get('/', logout);


export default logoutRouter;
