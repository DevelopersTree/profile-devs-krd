const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const httpProxy = require('http-proxy');
require('dotenv').config();

const app = express()
const apiProxy = httpProxy.createProxyServer({ proxyTimeout: 3000, timeout: 3000 });
apiProxy.on('proxyReq', (proxyReq, req, res, options) => {
    // proxyReq.path += `&${cityQueryChunks}`;
});

app.use(compression());
app.use(helmet());
app.use(cors());

app.use((req, res) => {
    var domain = req.get('host').match(/\w+/); // e.g., host: "subdomain.website.com"
    if (domain)
       var subdomain = domain[0]; // Use "subdomain"
    apiProxy.web(req, res, { target: `https://${subdomain}.github.io`, changeOrigin: true });
});

module.exports = app;