// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create data file
const dataFile = 'data.json';

// Read data
const readData = () => {
  return JSON.parse(fs.readFileSync(dataFile));
};

// Write data
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Get comments
app.get('/comments', (req, res) => {
  res.json(readData().comments);
});

// Post comments
app.post('/comments', (req, res) => {
  const data = readData();
  data.comments.push(req.body);
  writeData(data);
  res.json(data.comments);
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
