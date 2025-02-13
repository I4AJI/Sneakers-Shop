# Sneakers Shop Backend API

A RESTful API backend for an e-commerce platform specializing in sneakers. Built with Node.js, Express, and MongoDB.


## Features

- CRUD operations for sneakers inventory
- MongoDB database integration
- REST API endpoints
- Error handling middleware
- CORS support
- Environment configuration
- Postman testing ready

## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Tools**: Postman, Nodemon, Dotenv
- **Middleware**: CORS, Express JSON parser

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local)
- Postman (for testing)



## API Documentation

### Base URL
`http://localhost:5000/api/sneakers`

### Endpoints

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | /              | Get all sneakers             |
| POST   | /              | Create new sneaker           |
| PATCH  | /:id           | Update sneaker by ID         |
| DELETE | /:id           | Delete sneaker by ID         |


