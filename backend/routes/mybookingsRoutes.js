const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const bookingController = require('../controllers/bookingController');


router.post('/pay', paymentController.initiatePayment);
router.get('/getbookings',  bookingController.getBookings);
router.post('/delete',  bookingController.delBookings);


module.exports = router;
