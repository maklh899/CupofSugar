const router = require('express').Router();
const aptControl = require('../controller/aptControl');

// router.get('/getAptTenants', aptControl.getAptTenants);
router.post('/createNewApt', aptControl.createNewApt);

// export default router;
module.exports = router;
