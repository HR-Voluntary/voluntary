const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// ROUTES:
const userRouter = require('./routes/user.js');
const itemRouter = require('./routes/item.js');

// ROUTES MIDDLEWARE:
app.use('/user', userRouter);
app.use('/item', itemRouter);


app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});