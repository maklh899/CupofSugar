const router = require('express').Router();
const userControl = require('../controller/userControl');
// const router = express.Router();

router.post('/signUp', userControl.signUp);
router.post('/signIn', userControl.signIn);
router.get('/findAll', userControl.findAll);

// export default router;
module.exports = router;
