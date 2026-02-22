const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('/load', (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

function parseUserAgent(ua) {
  if (!ua) return { browser: 'Unknown', device: 'Unknown' };

  // Device
  let device = 'Desktop';
  if (/android/i.test(ua)) device = 'Android';
  else if (/iphone/i.test(ua)) device = 'iPhone';
  else if (/ipad/i.test(ua)) device = 'iPad';
  else if (/mobile/i.test(ua)) device = 'Mobile';

  // Browser
  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/opr\//i.test(ua)) browser = 'Opera';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/msie|trident/i.test(ua)) browser = 'Internet Explorer';

  return { browser, device };
}

app.post('/load', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const page = req.body.page || 'unknown';
  const ua = req.headers['user-agent'];
  const { browser, device } = parseUserAgent(ua);

  const now = new Date();
  const date = now.toLocaleDateString('en-US', { timeZone: 'America/Halifax', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { timeZone: 'America/Halifax', hour: '2-digit', minute: '2-digit', second: '2-digit' });

  console.log(`Page: ${page} | IP: ${ip} | Device: ${device} | Browser: ${browser} | Date: ${date} | Time: ${time}`);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

