const express = require('express');
const inputmethod = require('./methods/input');
const billMethod = require('./methods/bill');

const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/input', async (req, res) => {
  const result = await inputmethod.inputData(req);
  res.send(result);
});

app.get('/bill', async (req, res) => {
  const result = await billMethod.getBill();
  res.send(result);
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));