const User = require('../models/userModel');
const Rooms = require('../models/chatroomModel');

// returns chatrooms of the user
async function getAllRooms(payload) {
  console.log('getAllRooms() payload:', payload);
  return User.findOne({ '_id': payload })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User does not exist');
      } else {
        return user.messageRoomIDs;
      }
    });
}

async function createChatroom(payload) {
  console.log('createChatroom() service payload:', payload);
  const newChatroom = new Rooms({
    name: payload.roomName,
    members: payload.usernamesArr,
  });
  return newChatroom.save();
}

module.exports = { getAllRooms, createChatroom };
