const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*'  // В продакшн можно будет ограничить
}));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

// Обслуживание папки uploads как статической
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Маршруты для продакшн режима
if (process.env.NODE_ENV === 'production') {
  // Установите папку build как статичную
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Любой маршрут, не определенный выше, ведет на index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
} else {
  // Базовый маршрут для режима разработки
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Обработка ошибок (middleware)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});