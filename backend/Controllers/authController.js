const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;


const register = async (req, res) => {
    const { email, password,location } = req.body;

    try {
        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already registered');
        }

        // Hash the password
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userid = generateUserId(ip, Date.now());
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ userid:userid, email, password: hashedPassword,IpAddress:ip,Location:location });
        await newUser.save();

        res.status(201).send('Registration successful');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.userid, email: user.email }, secretKey, { expiresIn: '1h' });
        const user_Id =user.userid
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.cookie('user_cookie', user_Id, { httpOnly: true, maxAge: 3600000 });
        res.json({ token });
        
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal server error');
    }
};

const logout = (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('user_cookie');

    res.redirect('/'); 
};

function generateUserId(...data){
  const combinedData = data.join('|');
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(combinedData);
  return hmac.digest('hex');
}

module.exports = {
    register,
    login,
    logout
};
