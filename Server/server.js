'use strict';

let express = require('express');
let app = express();
let appPort = 8080;

app.use(express.static('../Web'));

console.log('Server running @ localhost:'+appPort);
app.listen(appPort);