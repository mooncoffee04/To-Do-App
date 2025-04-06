const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log("🧪 Loaded .env → DB_PASSWORD:", process.env.DB_PASSWORD);

const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

// 🔧 Middleware (must come before routes)
app.use(cors());
app.use(express.json()); // This is crucial for parsing JSON request bodies

// 🚏 Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 🎯 Test route
app.get('/', (req, res) => {
  res.send('🎉 Todo API is running!');
});

// 🚀 Sync database and start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

