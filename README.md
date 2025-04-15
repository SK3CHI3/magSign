# Interactive Authentication System

A modern, responsive authentication system built with React and Node.js, featuring an interactive UI with smooth animations powered by Rive.

![Authentication System Demo](./README%20files/first_vid.gif)

## Features

- **User Authentication**
  - Username-based registration and login
  - JWT-based authentication
  - Secure password hashing using bcrypt
  - Form validation with real-time feedback

- **Interactive UI**
  - Smooth transitions and animations using Rive
  - Responsive design for all device sizes
  - Dark/Light theme toggle
  - Interactive error handling with visual feedback

- **Security**
  - Password encryption
  - Protected routes
  - Input validation and sanitization
  - Secure session management

![Dark Mode](./README%20files/dark_mode.gif)

## Technology Stack

- **Frontend**
  - React.js
  - React Router DOM for routing
  - Rive for animations
  - CSS3 for styling

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd Interactive-signin-signup-1
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

3. Create a .env file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lovebirds
   JWT_SECRET=your_jwt_secret_key_here
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the frontend (port 3000) and backend (port 5000) servers concurrently.

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
├── public/                 # Static files
├── server/                 # Backend server code
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   └── routes/           # API routes
└── src/                   # Frontend source code
    ├── assets/           # Images and animations
    ├── components/       # React components
    ├── styles/          # CSS styles
    └── App.js           # Main React component
```

## API Endpoints

- **POST /api/auth/register**
  - Register a new user
  - Required fields: username, password

- **POST /api/auth/login**
  - Authenticate a user
  - Required fields: username, password

## Responsive Design

The application is fully responsive and works seamlessly across different device sizes:
- Desktop
- Tablet
- Mobile

![Responsive Design](./README%20files/responsive.gif)

## Error Handling

Custom 404 page for undefined routes:

![404 Page](./README%20files/404.gif)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Rive](https://rive.app/) for the amazing animation system
- [React](https://reactjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database

## Contact

Your Name - [Your Email]

Project Link: [repository-url]

---

Built with ❤️ using React, Node.js, and Rive