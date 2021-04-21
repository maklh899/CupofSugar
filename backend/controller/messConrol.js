/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');
const key = require('../keys');

const { getAllRooms, createChatroom } = require('../services/messService');
const { getAptTenants } = require('../services/aptService');

const getUserRooms = async (req, res) => {
  try {
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);
    if (verToken) {
      console.log('getUserRooms token verified: ', verToken);
      const currUser = req.body;
      console.log(currUser);
      const chatRooms = await getAllRooms(verToken['_id']);
      console.log('getUserRooms chatRooms response: ', chatRooms);
      res.status(200).json({
        success: true,
        data: chatRooms,
      });
    }
  } catch (error) {
    console.log('getUserRooms error: ', error.message);
    res.status(500).json({
    });
  }
};

const createChatRoom = async (req, res) => {
  try {
    console.log('---createChatRoom messControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    const { aptIds, usernames } = req.body;

    let usernamesArr = usernames;
    if (!usernamesArr) {
      usernamesArr = [];
    }

    let roomName = aptIds.join(', ');

    for (let i = 0; i < aptIds.length; i += 1) {
      const aptTenants = await getAptTenants(aptIds[i]);
      usernamesArr = usernames.concat(aptTenants);
    }

    if (verToken) {
      console.log('createChatRoom token verified: ', verToken);
      const currUser = req.body;
      console.log(currUser);
      const chatRooms = await createChatroom(roomName, usernamesArr);
      console.log('createChatRoom chatRooms response: ', chatRooms);

      res.status(200).send();
    }
  } catch (error) {
    console.log('createChatRoom error: ', error.message);
    res.status(500).send();
  }
};

const messControl = {
  getUserRooms,
  createChatRoom,
};

module.exports = messControl;

// export default {
//   initiate: async (req, res) => { },
//   postMessage: async (req, res) => { },
//   getRecentConversation: async (req, res) => { },
//   getConversationByRoomId: async (req, res) => { },
//   markConversationReadByRoomId: async (req, res) => { },

//   deleteRoomById: async (req, res) => {},
//   deleteMessageById: async (req, res) => {},
// }