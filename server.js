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

// Shopify routes
app.use('/shopify', shopifyRoutes);

// Initialize Server with port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
