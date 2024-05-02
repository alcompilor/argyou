import User from '../models/usersModel.js';

export const createUser = async (req, res) => {
    try {
        const { fullName, username, email, birthDate, password, gender } = req.body;
        const newUser = new User({
            fullName,
            username,
            email,
            birthDate,
            password,
            gender
        });
        await newUser.save();
        
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).send({ message: 'Error creating user', error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { fullName, username, email, birthDate, password, gender } = req.body;

        const user = await User.findOneAndUpdate({ username: req.params.username }, {
            fullName,
            username,
            email,
            birthDate,
            password,
            gender
        }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).send({ message: 'Error updating user', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error: error.message });
    }
};