const jwt = require('jsonwebtoken');
const key = require('../keys');

const { createApt } = require('../services/aptService');

const createNewApt = async (req, res) => {
  try {
    console.log('---createNewApt aptControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    // const { rent, memberUsernames } = req.body;

    if (verToken) {
      console.log('createNewApt token verified: ', verToken);

      const apt = await createApt(req.body);
      console.log('createNewApt response: ', apt);

      res.status(200).send();
    }
  } catch (error) {
    console.log('createNewApt error: ', error.message);
    res.status(500).send();
  }
};

const aptControl = {
  createNewApt,
};

module.exports = aptControl;
