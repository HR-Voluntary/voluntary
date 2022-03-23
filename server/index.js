const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const port = 3001;
const s3 = require('./s3');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// ROUTES:
const userRouter = require('./routes/user.js');
const itemRouter = require('./routes/item.js');
const ratingsRouter = require('./routes/ratings.js');

// ROUTES MIDDLEWARE:
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/ratings', ratingsRouter);

// CUSTOM ROUTE FOR S3 IMAGE UPLOAD:
app.get('/s3Url', (req, res) => {
  s3().then(url => {
    res.status(200).send(url)
  });
});

// LISTEN:
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});