const express = require("express");
const httpProxy = require('express-http-proxy');
const app = express(); 
const proxy = httpProxy("http://13.60.86.66:3000",{limit: "120mb"});

app.get("/Gateway", (req, res) => { 
    res.send("Agronomics Gateway is Running"); 
});

app.all('/*', (req, res) => {
    proxy(req, res);
});

const PORT = 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });