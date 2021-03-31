const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures our .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8070;

app.use(cors()); // cors middleware
app.use(express.json()); // allows us to parse json

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// const { connection } = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully');
// });

// connects to the uri that our database is stored at
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//     .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
//     .catch((error) => console.log(`${error} did not connect`));

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/user_routes');
const usersRouter = require('./routers/authRoute');
// app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// starts the server, and listens on a certain port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
