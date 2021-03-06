const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const servicesRoutes = require('./api/servicesRoutes');
const userRoutes = require('./api/usersRoutes');
const { PORT } = require('./config');

const app = express();

// Global MiddleWare
app.use(morgan('dev'));
app.use(cors());
// igalinam express app atkoduoti json gautus duomenis
app.use(express.json());
app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', userRoutes);
app.use('/api', servicesRoutes);

app.listen(PORT, () => console.log('server online, PORT', PORT));
