const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from your GitHub Pages site
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this to your GitHub Pages URL later
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.use(express.json()); 

app.post('/load', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const page = req.body.page || 'unknown';
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { timeZone: 'America/Halifax', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { timeZone: 'America/Halifax', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  console.log(`Page: ${page} | IP: ${ip} | Date: ${date} | Time: ${time}`);
  res.sendStatus(200);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

