const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to allow access only from specific IP addresses

const allowOnlySpecificIPs = (req, res, next) => {
  const allowedIPs = ['122.165.67.11']; // Allow this IP
  const blockedIPs = ['49.207.179.138']; // Block this IP
  const clientIP = req.ip;

  if (allowedIPs.includes(clientIP)) {
    next(); 
  } else if (blockedIPs.includes(clientIP)) {
    res.status(403).send('Forbidden');
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.use(bodyParser.json());

// Route for user authentication with static OTP

app.post('/authenticate', (req, res) => {
  const { otp } = req.body;

  if (otp === '123456') {
    res.status(200).send('Authentication successful');
  } else {
    res.status(401).send('Authentication failed');
  }
});

// Route to verify OTP entered by the user

app.post('/verify-otp', (req, res) => {
  const { otp } = req.body;

  if (otp === '123456') {
    res.status(200).send('OTP verified');
  } else {
    res.status(401).send('Invalid OTP');
  }
});

// Route to redirect user to the home page

app.get('/home', allowOnlySpecificIPs, (req, res) => {
  res.redirect('/home'); 
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
