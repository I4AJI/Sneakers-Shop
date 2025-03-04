require('dotenv').config();
const express = require('express');
const { MONGODB_URI, PORT } = require('./config/env');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

const sneakersRouter = require('./routes/sneakers');
app.use('/api/sneakers', sneakersRouter);

// Basic Route
app.get('/', (req, res) => {
    res.send('Sneakers Shop Backend');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('💥 ERROR:', err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

const morgan = require('morgan');
app.use(morgan('dev')); // Shows request logs in terminal

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

