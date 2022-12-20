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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

    return res.status(200).json({});
  }
});

// Shopify routes
app.use('/shopify', shopifyRoutes);

// Initialize Server with port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
