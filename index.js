const express = require("express");
const http = require("http");
const httpProxy = require('express-http-proxy');

const app = express();
const server = http.createServer(app);
const proxy = httpProxy("http://13.60.86.66:3000", { 
    limit: "120mb", 
    proxyReqOptDecorator: (opts, req) => {
        // Handle WebSocket upgrade requests
        if (req.headers['upgrade'] === 'websocket') {
            opts.headers['Upgrade'] = 'websocket';
            opts.headers['Connection'] = 'Upgrade';
        }
        return opts;
    }
});

app.get("/Gateway", (req, res) => { 
    res.send("Agronomics Gateway is Running"); 
});

app.all('/*', (req, res) => {
    proxy(req, res);
});

const PORT = 5000;
server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
