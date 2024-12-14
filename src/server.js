const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://surajrathore8100:Admin123@cluster0.gm6yf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
// Routes
const indexRoute = require('./routes/index');
const { default: helmet } = require('helmet');
app.use('/', indexRoute);
// Use Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://cricket-server-df3i.vercel.app"],
      scriptSrc: ["'self'", "https://vercel.live"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
