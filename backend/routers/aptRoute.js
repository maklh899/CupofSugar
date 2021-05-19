const router = require('express').Router();
const aptControl = require('../controller/aptControl');

// router.get('/getAptTenants', aptControl.getAptTenants);
router.post('/createNewApt', aptControl.createNewApt);
router.post('/makePayment', aptControl.makePayment);
router.get('/getAptLedger', aptControl.getAptLedger);
router.get('/getAptBalance', aptControl.getAptBalance);
router.post('/makeMaintReq', aptControl.makeMaintReq);
router.get('/getMaintReqs', aptControl.getMaintReqs);

// export default router;
module.exports = router;
