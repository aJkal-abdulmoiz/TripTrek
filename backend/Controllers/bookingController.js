const express = require('express');
const bodyParser = require('body-parser');
const Booking = require('../models/booking');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const createBooking = async (req, res) => {

    const userid = req.cookies.user_cookie;
    const { name, destination, date, price, phone, persons } = req.body;
    console.log(date)
    

    try {
        const newBooking = new Booking({
            userid, 
            name,
            destination,
            date,
            price,
            phone,
            persons
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Please Login to create booking' });
    }
};

const getBookings = async (req, res) => {
    try {
        // Extract userid from cookies
        const userid = req.cookies.user_cookie;

        if (!userid) {
            return res.status(400).json({ error: 'User ID not provided' });
        }

        const bookings = await Booking.find({ userid });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
            
        }

        res.json(bookings);
    } catch (error) {
        // Handle errors
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const delBookings = async (req, res) => {
    try {
        // Check if the user is authenticated
        const userid = req.cookies.user_cookie;
        if (!userid) {
            return res.status(401).json({ error: 'Unauthorized: User not logged in' });
        }

        // Extract destination from the request body
        const { destination } = req.body;
        if (!destination) {
            return res.status(400).json({ error: 'Destination not provided' });
        }

        // Check if the destination exists for the user before deleting
        const existingBooking = await Booking.findOne({ userid, destination });
        if (!existingBooking) {
            return res.status(404).json({ message: 'Booking not found for this user and destination' });
        }

        // Delete all bookings matching the user ID and destination
        const result = await Booking.deleteMany({ userid, destination });

        res.json({ message: `${result.deletedCount} bookings deleted successfully` });
    } catch (error) {
        // Handle errors
        console.error('Error deleting bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






module.exports = {
    createBooking,
    getBookings,
    delBookings
};
