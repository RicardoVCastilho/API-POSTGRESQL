const express = require('express');
const pool  = require('./db/connection');
const app = express();
const port = 3000;
const dataRoutes = require('./routes/dataRoutes');

app.use(express.json());
app.use('/api', dataRoutes);

app.listen(port, () => {
    pool.connect().then(client => {
        console.log('Connected to the database');
        client.release();
    }).catch(err => {
        console.log('Error connecting to the database', err);
    });
    console.log(`Server is running on port ${port}`);
});