const jwt = require('jsonwebtoken');
const key = require('../keys');

const {
  createApt, addTenant, addPayment, paymentHistory, aptBalance, addMaintReq, maintReqs,
} = require('../services/aptService');
const { findUserByUsername, updateUserDoc, findUserByID } = require('../services/userService');

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

const addTenantToApt = async (req, res) => {
  try {
    console.log('---addTenant aptControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      console.log('createNewApt token verified: ', verToken);

      // try to add person into apartment
      const apt = await addTenant(req.body);
      console.log('createNewApt response: ', apt);
      // if apt doesnt exist, make a new apt
      if (!apt) {
        const newApt = await createApt({ members: [req.body.user], rent: 1720 });

        // UPDATE APTID FOR USER DOCUMENT
        const currUser = await findUserByUsername(req.body.user);
        const userDoc = await updateUserDoc(currUser['_id'], { aptId: newApt.AptNumber });
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

// body: amount
const makePayment = async (req, res) => {
  try {
    console.log('---makePayment aptControl---');
    // console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      console.log('makePayment req.body: ', req.body);

      const currUser = await findUserByID(verToken['_id']);
      const currName = `${currUser.firstName} ${currUser.lastName}`;
      const payment = await addPayment({
        payer: currName, amount: req.body.amount, apt: currUser.aptId,
      });
      console.log('makePayment payment: ', payment);

      res.status(200).json({
        success: true,
        response: payment,
      });
    }
  } catch (error) {
    console.log('makePayment error: ', error.message);
    res.status(200).json({
      success: false,
      mess: error.message,
    });
  }
};

const getAptLedger = async (req, res) => {
  try {
    console.log('---getAptLedger aptControl---');
    // console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      const currUser = await findUserByID(verToken['_id']);
      const history = await paymentHistory({
        apt: currUser.aptId,
      });
      console.log('getAptLedger history: ', history);

      res.status(200).json({
        success: true,
        history,
      });
    }
  } catch (error) {
    console.log('getAptLedger error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

const getAptBalance = async (req, res) => {
  try {
    console.log('---getAptBalance aptControl---');
    // console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      const currUser = await findUserByID(verToken['_id']);
      const balance = await aptBalance({
        apt: currUser.aptId,
      });
      console.log('getAptBalance balance: ', balance);

      res.status(200).json({
        success: true,
        balance,
      });
    }
  } catch (error) {
    console.log('getAptBalance error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

const makeMaintReq = async (req, res) => {
  try {
    console.log('---makeMaintReq aptControl---');
    // console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      console.log('makeMaintReq req.body: ', req.body);

      const currUser = await findUserByID(verToken['_id']);
      const currName = `${currUser.firstName} ${currUser.lastName}`;
      const mainReq = await addMaintReq({
        requestor: currName, body: req.body.request, status: 'New', apt: currUser.aptId,
      });
      console.log('makeMaintReq mainReq: ', mainReq);

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log('makeMaintReq error: ', error.message);
    res.status(200).json({
      success: false,
      mess: error.message,
    });
  }
};

const getMaintReqs = async (req, res) => {
  try {
    console.log('---getMainReqs aptControl---');
    // console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    if (verToken) {
      const currUser = await findUserByID(verToken['_id']);
      const requests = await maintReqs({
        apt: currUser.aptId,
      });
      console.log('getMainReqs requests: ', requests);

      res.status(200).json({
        success: true,
        requests,
      });
    }
  } catch (error) {
    console.log('getMainReqs error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

const aptControl = {
  createNewApt,
  addTenantToApt,
  makePayment,
  getAptLedger,
  getAptBalance,
  makeMaintReq,
  getMaintReqs,
};

module.exports = aptControl;
