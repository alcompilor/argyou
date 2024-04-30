import User from '../models/User';

exports.createUser = async (req, res) => {
    app.post('/api/users', async (req, res) => {
        try {
          const user = new User(req.body);
          await user.save();
          res.status(201).send(user);
        } catch (error) {
          res.status(400).send(error);
        }
      });
  };
  
  exports.getUser = async (req, res) => {
    app.get('/api/users/:id', async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          if (!user) {
            return res.status(404).send();
          }
          res.send(user);
        } catch (error) {
          res.status(500).send(error);
        }
      });
  };
  
  exports.updateUser = async (req, res) => {
    app.patch('/api/users/:id', async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
          if (!user) {
            return res.status(404).send();
          }
          res.send(user);
        } catch (error) {
          res.status(400).send(error);
        }
      });
  };
  
  exports.deleteUser = async (req, res) => {
    app.delete('/api/users/:id', async (req, res) => {
        try {
          const user = await User.findByIdAndDelete(req.params.id);
          if (!user) {
            return res.status(404).send();
          }
          res.send(user);
        } catch (error) {
          res.status(500).send(error);
        }
      });
  };
  