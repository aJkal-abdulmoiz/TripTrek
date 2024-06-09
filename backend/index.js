const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const frontendPath = path.join(__dirname, '..', 'frontend');
const viewsPath = path.join(frontendPath, 'views');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/mybookingsRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static(frontendPath));

app.options('*', cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(viewsPath, 'login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(viewsPath, 'register.html'));
});
app.get('/bookings', (req, res) => {
    res.sendFile(path.join(viewsPath, 'booking.html'));
});

app.get('/mybookings', (req, res) => {
    res.sendFile(path.join(viewsPath, 'mybookings.html'));
});

// Mount routes
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/mybookings', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
