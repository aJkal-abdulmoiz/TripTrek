const express = require('express');
const app = express();

app.use(express.json());
const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK
paypal.configure({
    'mode': 'sandbox', 
    'client_id': '',
    'client_secret': ''
});

const initiatePayment = (req, res) => {
    const { name, price } = req.body; 

    // Create payment object
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success", // Replace with your actual success URL
            "cancel_url": "http://localhost:3000/cancel" // Replace with your actual cancel URL
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": name,
                    "sku": "001",
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": price // Total amount to charge
            },
            "description": "Booking payment"
        }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error initiating payment');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.redirect(payment.links[i].href); // Redirect user to PayPal approval URL
                }
            }
            return res.status(500).send('Approval URL not found');
        }
    });
};

const paymentSuccess = (req, res) => {
    res.send('Payment successful!');
};

const paymentCancel = (req, res) => {
    res.send('Payment cancelled.');
};

module.exports = {
    initiatePayment,
    paymentSuccess,
    paymentCancel
};
