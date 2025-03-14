# SneakerShop - E-commerce Platform

SneakerShop is a modern e-commerce platform for selling sneakers, built using the MERN stack (MongoDB, Express, React, Node.js).

![image](https://github.com/user-attachments/assets/e5794917-ab9a-486a-af81-c5177c49f1a5)


## Features

- 👟 Responsive product catalog with animated UI
- 🛒 Shopping cart functionality
- 👤 User authentication and authorization
- 🔐 Admin panel for product management
- 📸 Image upload for product photos
- 📱 Mobile-friendly design
- ✨ Smooth animations and transitions

## Technology Stack

### Frontend
- React.js
- React Router
- React Bootstrap
- Framer Motion for animations
- Axios for API requests
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- bcrypt.js for password hashing

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/sneaker-shop.git
cd sneaker-shop/backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following:
```
NODE_ENV=development
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the frontend development server
```bash
npm start
```

4. The application should now be running at `http://localhost:3000`

## Admin Account Setup

Run the following script to create an admin account:
```bash
cd backend
node createAdminUser.js
```

This will create an admin user with:
- Email: admin@example.com
- Password: admin123

## Usage

### Shopping
- Browse the catalog on the homepage
- Click on a product to view details
- Select size, color, and quantity
- Add products to cart
- Review items in the cart and checkout

### Admin Panel
- Log in as an admin
- Access the admin panel from the user dropdown menu
- Add, edit, or delete products
- Upload product images
- View and manage the product catalog

## Project Structure

```
sneaker-shop/
├── backend/            # Backend code
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── uploads/        # Uploaded images
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── frontend/           # Frontend code
│   ├── public/         # Static files
│   └── src/            # Source code
│       ├── components/ # Reusable UI components
│       ├── pages/      # Main pages
│       ├── App.js      # Main component
│       └── index.js    # Entry point
└── README.md           # Project documentation
```

## Future Enhancements

- Payment gateway integration
- Order management system
- User reviews and ratings
- Product filtering and search
- Wishlist functionality
- Email notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Bootstrap](https://react-bootstrap.github.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Font Awesome](https://fontawesome.com/) for icons
- All the amazing sneaker brands that inspired this project

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/sneaker-shop](https://github.com/yourusername/sneaker-shop)
