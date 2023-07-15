const express = require('express');
const axios = require('axios');
const httpProxy = require('http-proxy');


const app = express();
const port = 3000;

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/RobVanGroenewoud/ba89ad7684df8cefe5c183adb498cc65/raw/f2eec6d2cb89f5d779e16b28ed0dab89d738ba96/sample.csv');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// live
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
});
app.use(
  '*',
  (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001'+req.originalUrl });
  }
);

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
