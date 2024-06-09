const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const mapsController = require('../Controllers/mapsController')
const { verifyToken } = require('../utils/authUtils');

router.post('/', bookingController.createBooking);
router.get('/',mapsController.showDistance);

module.exports = router;
