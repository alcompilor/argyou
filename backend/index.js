const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routers/users');
const User = require('./models/User');

require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware for parsing JSON 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});