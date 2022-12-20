/*
    Shopify Routes
*/
const express = require('express');
const router = express.Router();
const shopifyController = require('../controllers/shopifyController');

// Products
router.post('/products/all', shopifyController.getProducts); // Fetch all products
router.post('/products/search', shopifyController.searchProducts); // Search for products

// Customers
router.post('/customers/all', shopifyController.getCustomers); // Fetch all customers

// Orders
router.post('/orders/phone', shopifyController.getOrdersByCustomerPhone); // Fetch all orders by given customer's phone

// Draft Orders
router.post('/draftorder/create', shopifyController.createDraftOrder); // Create draft order with payment provider and custom note

// Webhooks
router.post('/webhook/list', shopifyController.webhookList); // Fetch all webhooks list
router.post('/webhook/delete', shopifyController.webhookDelete); // Delete webhook
router.post('/webhook/order/creation', shopifyController.webhookOrderCreation); // Create webhook for order creation

module.exports = router;
