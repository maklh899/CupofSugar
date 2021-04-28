const jwt = require('jsonwebtoken');
const key = require('../keys');

const { createApt } = require('../services/aptService');
const { findUserByUsername, updateUserDoc } = require('../services/userService');

const createNewApt = async (req, res) => {
  try {
    console.log('---createNewApt aptControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      console.log('createNewApt token verified: ', verToken);

      const apt = await createApt(req.body);
      console.log('createNewApt response: ', apt);

      // NEED TO UPDATE APTID FOR USER DOCUMENT
      for (let i = 0; i < req.body.members.length; i += 1) {
        const currUser = await findUserByUsername(req.body.members[i]);
        const userDoc = await updateUserDoc(currUser['_id'], { aptId: apt.AptNumber });
      }
      //console.log('createNewApt userDoc: ', userDoc);

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log('createNewApt error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

const aptControl = {
  createNewApt,
};

module.exports = aptControl;
