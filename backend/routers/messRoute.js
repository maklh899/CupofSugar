const router = require('express').Router();
const messControl = require('../controller/messControl');
// const router = express.Router();

router.get('/', chatRoom.getRecentConversation);
router.get('/:roomId', chatRoom.getConversationByRoomId);
router.post('/initiate', chatRoom.initiate);
router.post('/:roomId/message', chatRoom.postMessage);
router.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId);

// export default router;
module.exports = router;
