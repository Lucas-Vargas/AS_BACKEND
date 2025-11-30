require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const app = express();
const port = 3000;

const favRoutes = require('./routes/favRoutes');
const dashRoutes = require('./routes/dashRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(helmet());
app.use(cors())

app.use('/favoritos', favRoutes);
app.use('/dashboard', dashRoutes);
app.use('/usuario', userRoutes);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});