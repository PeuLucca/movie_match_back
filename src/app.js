const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const usersRoutes = require('./routes/usersRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`Server running on ${port}!!!`);
});

app.use('/users', usersRoutes);
app.use('/movie', movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
