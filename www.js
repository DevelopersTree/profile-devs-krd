const https = require("https"),
  fs = require("fs");

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/devs.krd/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/devs.krd/fullchain.pem")
};


const app  = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})


https.createServer(options, app).listen(8080);