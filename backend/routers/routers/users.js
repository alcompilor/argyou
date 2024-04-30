import express from 'express';
import { createUser, getUser, updateUser, deleteUser, authenticateUser } from '../controllers/userController.js';

const router = express.Router();

// CRUD operations
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/login', async(req, res) =>{
    try {
        const {username, password} = req.body;
        const user = await authenticateUser(username, password);
        res.status(200).json({message: 'Login Successful', user});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

export default router;
