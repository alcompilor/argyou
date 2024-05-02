import User from '../models/User';

const usersController = {
    createUser: async (req, res) => {
        try {
            const { fullName, userName, email, birthdate, password, gender } = req.body;
            const newUser = new User({
                fullName,
                userName,
                email,
                birthdate,
                hashed_pwd: password,
                gender
            });
            await newUser.save();
            res.status(201).send({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(400).send({ message: 'Error creating user', error: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving user', error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { fullName, userName, email, birthdate, password, gender } = req.body;
            const user = await User.findByIdAndUpdate(req.params.userId, {
                fullName,
                userName,
                email,
                birthdate,
                hashed_pwd: password,
                gender
            }, { new: true });

            if (!user) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
            res.status(200).send({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(400).send({ message: 'Error updating user', error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error deleting user', error: error.message });
        }
    }
};

export default usersController;
