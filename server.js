/*
  Server File
*/

// Initialize Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import shopify routes
const shopifyRoutes = require('./src/routes/shopifyRoutes');

// Bypass CORS
app.use(function (req, res, next) {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://revio-new.vercel.app',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Shopify routes
app.use('/shopify', shopifyRoutes);

// Initialize Server with port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
