/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');
const key = require('../keys');

const { findUserByID, findUserByUsername, updateUserDoc } = require('../services/userService');
const {
  getAllUserRooms,
  createChatroom,
  createMessage,
  getChatroombyId,
} = require('../services/messService');
const { getAptTenants } = require('../services/aptService');

const getUserRooms = async (req, res) => {
  try {
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);
    if (verToken) {
      console.log('getUserRooms token verified: ', verToken);

      const chatRooms = await getAllUserRooms(verToken['_id']);
      const chatRoomswTime = Array(chatRooms.length);
      // console.log('getUserRooms chatRooms response: ', chatRooms);

      for (let i = 0; i < chatRooms.length; i += 1) {
        const roomInfo = await getChatroombyId(chatRooms[i]['roomID']);;

        chatRoomswTime[i] = {
          roomID: chatRooms[i]['roomID'],
          roomName: chatRooms[i]['roomName'],
          updated_at: roomInfo['updated_at'],
        };
        //console.log('getUserRooms updated chatRoomswTime: ', chatRoomswTime[i]);
      }
      res.status(200).json({
        success: true,
        chatRoomswTime,
      });
    }
  } catch (error) {
    console.log('getUserRooms error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

// params: aptIds, usernames
// user has a choice of chatting by apt or by individual users
const createChatRoom = async (req, res) => {
  try {
    console.log('---createChatRoom messControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    let aptIds = [];
    let usernames = [];

    if (verToken) {
      console.log('createChatRoom token verified: ', verToken);
      const currUser = await findUserByID(verToken['_id']);
      console.log(currUser);

      let roomName;

      if (req.body.aptIds) {
        aptIds = req.body.aptIds;
        aptIds.push(currUser.aptId);
        roomName = "APT " + aptIds.join(', APT ');
      } else if (req.body.usernames) {
        usernames = req.body.usernames;
        usernames.push(currUser.userName);
        roomName = usernames.join(', ');
      } else {
        res.status(401).json({
          success: false,
          mess: 'Usernames/apt numbers have not been specified.',
        });
      }

      const userDocs = [];

      for (let i = 0; i < aptIds.length; i += 1) {
        const aptTenants = await getAptTenants(aptIds[i]);
        console.log('createChatroom aptTenants: ', aptTenants);
        usernames = usernames.concat(aptTenants);
      }
      for (let i = 0; i < usernames.length; i += 1) {
        const user = await findUserByUsername(usernames[i]);
        // console.log('createChatroom user: ', user);
        userDocs.push(user);
      }

      console.log('createChatroom usernames: ', usernames);
      const chatRoom = await createChatroom({ roomName, usernames });
      console.log('createChatRoom chatRooms response: ', chatRoom);

      for (let i = 0; i < userDocs.length; i += 1) {
        userDocs[i].messageRooms.push({ roomID: chatRoom['_id'], roomName });
        const userDoc = await updateUserDoc(userDocs[i]['_id'], { messageRooms: userDocs[i].messageRooms });
      }

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log('createChatRoom error: ', error.message);
    res.status(401).json({
      success: false,
      mess: error.message,
    });
  }
};

// params: message
const postMessage = async (req, res) => {
  try {
    console.log('---postMessage messControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    const currUser = await findUserByID(verToken['_id']);
    const { roomId } = req.params;
    const messBody = await createMessage(currUser.userName, roomId, req.body);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('postMessage error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

// params: none
const getAllRoomMess = async (req, res) => {
  try {
    console.log('---getAllRoomMess messControl---');
    console.log('auth token: ', req.headers['x-auth-token']);
    const token = req.headers['x-auth-token'];
    const verToken = jwt.verify(token, key.JWT_SECRET);

    const { roomId } = req.params;

    const chatroom = await getChatroombyId(roomId);
    console.log('getAllRoomMess chatroom.messages: ', chatroom.messages);

    res.status(200).json({
      success: true,
      roomID: chatroom.roomID,
      messages: chatroom.messages,
    });
  } catch (error) {
    console.log('getAllRoomMess error: ', error.message);
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

const messControl = {
  getUserRooms,
  createChatRoom,
  postMessage,
  getAllRoomMess,
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