const User = require('../models/userModel');
const Rooms = require('../models/chatroomModel');

// returns chatrooms of a user
async function getAllUserRooms(userId) {
  console.log('getAllUserRooms() userId:', userId);
  return User.findOne({ '_id': userId })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User does not exist');
      } else {
        return user.messageRooms;
      }
    });
}

async function createChatroom(payload) {
  console.log('createChatroom() service payload:', payload);

  const newChatroom = new Rooms({
    name: payload.roomName,
    members: payload.usernames,
  });
  return newChatroom.save();
}

async function getChatroombyId(payload) {
  console.log('getChatroombyId() messService payload:', payload);
  return Rooms.findOne({ '_id': payload })
    .exec()
    .then((room) => {
      if (!room) {
        console.log('getChatroombyId() !room:', room);
        throw new Error('Chatroom does not exist');
      } else {
        return room;
      }
    })
    .catch((error) => {
      console.log('getChatroombyId() error:', error.message);
      throw new Error(error.message);
    });
}

async function createMessage(username, roomId, payload) {
  console.log('createMessage() messService username:', username);
  console.log('createMessage() messService payload:', payload);
  const chatroom = await getChatroombyId(roomId);
  console.log('createMessage() chatroom:', chatroom);
  chatroom.messages.push({ sender: username, message_body: payload.message });
  return Rooms.updateOne({ '_id': roomId }, chatroom)
    .exec()
    .catch((error) => {
      console.log('createMessage() error:', error.message);
      throw new Error(error.message);
    });
}

module.exports = {
  getAllUserRooms,
  createChatroom,
  getChatroombyId,
  createMessage,
};
