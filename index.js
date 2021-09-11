const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const allRoutes = require('./routes');
const db = require('./db')
const app = express();
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(bodyParser.json());
app.use(cors());
app.use('/api', allRoutes);

app.get('/', (req, res) => {
    res.send('Server for Store Management!')
})
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});