const express = require('express');
const axios = require('axios');
const httpProxy = require('http-proxy');


const app = express();
const port = 3000;

const url = 'https://raw.githubusercontent.com/jinhoko/must-go-restaurant/master/data/pohang.tsv';

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get(url);
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
