# TRIP TREK

Trip Trek is a travel trip location booking site built with Express and Node.js. It features real-time location tracking using Leaflet for maps, Font Awesome for icons, and PayPal integration for payment processing.

## Features

- Real-time location tracking
- Interactive maps with Leaflet
- Responsive design with Font Awesome icons
- User authentication and session management
- Secure password hashing with bcrypt
- JSON Web Token (JWT) for authentication
- PayPal payment integration for booking trips

## Technologies Used

- Node.js
- Express
- Leaflet
- Font Awesome
- bcrypt
- JSON Web Token (JWT)
- MongoDB (with Mongoose)
- dotenv
- PayPal SDK

## Installation

1. Clone the repository:

    ```bash
    git clone [https://github.com/your-username/trip-trek.git](https://github.com/aJkal-abdulmoiz/TripTrek.git)
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PAYPAL_CLIENT_ID=your_paypal_client_id
    PAYPAL_CLIENT_SECRET=your_paypal_client_secret
    ```

4. Start the application:

    ```bash
    npm start
    ```

The server will start on `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
