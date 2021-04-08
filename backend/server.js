const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
// configures our .env file
require('dotenv').config();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/wakena6.onzasoft.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/wakena6.onzasoft.com/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = process.env.PORT || 8070;

app.use(cors()); // cors middleware
app.use(express.json()); // allows us to parse json

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/user_routes');
const usersRouter = require('./routers/authRoute');
// app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// starts the server, and listens on a certain port
httpServer.listen(8071, () => {
  console.log(`Http Server is running on port: 8071`);
});

httpsServer.listen(port, () => {
  console.log(`Https Server is running on port: ${port}`);
});
