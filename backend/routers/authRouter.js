import express from 'express';
import { signIn } from '../controllers/signInController.js';

const signInRouter = express.Router();

router.post('/', signIn);

export default signInRouter;