const router = require('express').Router();
const chatRoom = require('../controller/messConrol');

router.get('/getUserRooms', chatRoom.getUserRooms);
router.post('/createChatRoom', chatRoom.createChatRoom);
router.post('/postMessage', chatRoom.postMessage);
router.get('/getAllRoomMess', chatRoom.getAllRoomMess);
// router.get('/', chatRoom.getRecentConversation);
// router.get('/:roomId', chatRoom.getConversationByRoomId);
// router.post('/initiate', chatRoom.initiate);
// router.post('/:roomId/message', chatRoom.postMessage);
// router.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId);

// export default router;
module.exports = router;
