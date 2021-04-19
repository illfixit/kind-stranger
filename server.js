const path = require('path');
const express = require('express');
const app = express();
const currentPath = path.join(__dirname,);
const port = process.env.PORT || 3000;

app.use(express.static(currentPath));

app.listen(3000, () => {
  console.log('Server is working!');
});

app.get('*', (req, res) => {
  res.send(path.join(currentPath, 'index.html'));
});
