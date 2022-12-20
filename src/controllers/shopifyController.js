/*
  Shopify Controller
  Requires authorization to the provided shopify store
  Creates get/post calls to return data
*/

const Shopify = require('shopify-api-node');

/* 
  Products
*/
// Fetch All Products
exports.getProducts = async (req, res) => {
  const { shopName } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: 'innowave-dev',
        apiKey: '1dbbb54df92bc997465b594e250aed69',
        password: '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',
      });

      shopify.product
        .list()
        .then((products) => {
          res.send(products);
        })
        .catch((error) => res.status(500).send({ error: error.message }));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};

// Search for products
exports.searchProducts = async (req, res) => {
  // TODO: Query should include title
  const { shopName, apiKey, password, query } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      shopify.product
        .list({ title: query })
        .then((products) => {
          res.send(products);
        })
        .catch((error) => res.status(500).send({ error: error.message }));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};
/* <=============================> */

/* 
  Customers
*/
// Fetch All Customers
exports.getCustomers = async (req, res) => {
  const { shopName, apiKey, password } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      shopify.customer
        .list()
        .then((customers) => {
          res.send(customers);
        })
        .catch((error) => res.status(500).send({ error: error.message }));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};
/* <=============================> */

/* 
  Orders
*/
// Fetch All Orders By Given Customer's Phone
exports.getOrdersByCustomerPhone = async (req, res) => {
  const { shopName, apiKey, password, phone } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      shopify.customer
        .search({ query: `phone:${phone}` })
        .then((customers) => {
          if (customers.length > 0) {
            const customer = customers[0];
            return shopify.order.list({ customer_id: customer.id });
          } else {
            throw new Error(`No customer found with phone number ${phone}`);
          }
        })
        .then((orders) => {
          res.send(orders);
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};
/* <=============================> */

/* 
  Draft Orders
*/
// Create draft order with payment provider and custom note
exports.createDraftOrder = async (req, res) => {
  const {
    shopName,
    apiKey,
    password,
    // shipping_address,
    products,
    gateway,
    note,
  } = req.body;

  // Example for line_items
  // line_items: [
  //   {
  //     variant_id: 42491265908904,
  //     quantity: 1,
  //   },
  // ],

  // Example for shipping_address
  // shipping_address: {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   address1: '123 Main Street',
  //   city: 'New York',
  //   province: 'NY',
  //   country: 'US',
  //   zip: '10001'
  // },

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      // Create a draft order
      const draftOrder = {
        line_items: products,
        // shipping_address: shipping_address,
        gateway: gateway,
        note: note,
      };

      shopify.draftOrder
        .create(draftOrder)
        .then((draftOrder) => {
          res.send(draftOrder.invoice_url);
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};
/* <=============================> */

/* 
  Webhooks
*/
// List all webhooks
exports.webhookList = async (req, res) => {
  const { shopName, apiKey, password } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      shopify.webhook
        .list()
        .then((webhooks) => {
          res.send(webhooks);
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};

// Delete webhook
exports.webhookDelete = async (req, res) => {
  const { shopName, apiKey, password, address } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      shopify.webhook
        .list()
        .then((webhooks) => {
          webhooks.forEach((webhook) => {
            if (address === webhook.address) {
              const webhookId = webhook.id;

              shopify.webhook
                .delete(webhookId)
                .then((webhook) => {
                  res.send('Webhook successfully deleted');
                })
                .catch((error) => {
                  res.status(500).send({ error: error.message });
                });
            }
          });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};

// Create webhook for order creation
exports.webhookOrderCreation = async (req, res) => {
  const { shopName, apiKey, password, address } = req.body;

  if (
    typeof shopName === 'string' &&
    shopName.trim() !== '' &&
    typeof apiKey === 'string' &&
    apiKey.trim() !== '' &&
    typeof password === 'string' &&
    password.trim() !== ''
  ) {
    try {
      const shopify = new Shopify({
        shopName: shopName,
        apiKey: apiKey,
        password: password,
      });

      const webhook = {
        topic: 'orders/create',
        address: address,
        format: 'json',
      };

      shopify.webhook
        .create(webhook)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({
      error:
        'Missing shop name, api key or password as a request body properties and they cannot be empty',
    });
  }
};
/* <=============================> */
