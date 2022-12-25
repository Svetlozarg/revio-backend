/*
  Shopify Controller
  Requires authorization to the provided shopify store
  Creates get/post calls to return data
*/

const Shopify = require('shopify-api-node');

// TODO: get shopName from request and get apiKey and password from firebase
const shopify = new Shopify({
  shopName: 'innowave-dev',
  apiKey: '1dbbb54df92bc997465b594e250aed69',
  password: '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',
});

/* 
  Products
*/
// Fetch All Products
exports.getProducts = async (req, res) => {
  const { shopName } = req.body;

  try {
    shopify.product
      .list()
      .then((products) => {
        res.send(products);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Search for products
exports.searchProducts = async (req, res) => {
  const { shopName, query } = req.body;

  try {
    const productArr = [];
    shopify.product
      .list()
      .then((products) => {
        // Iterate over each product in the list
        products.forEach((product) => {
          // Check if the product title contains the search query string
          if (product.title.toLowerCase().includes(query.toLowerCase())) {
            productArr.push(product);
          }
        });
      })
      .then(() => {
        res.send(productArr);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
/* <=============================> */

/* 
  Customers
*/
// Fetch All Customers
exports.getCustomers = async (req, res) => {
  const { shopName } = req.body;

  try {
    shopify.customer
      .list()
      .then((customers) => {
        res.send(customers);
      })
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
/* <=============================> */

/* 
  Orders
*/
// Fetch All Orders By Given Customer's Phone
exports.getOrdersByCustomerPhone = async (req, res) => {
  const { shopName, phone } = req.body;

  try {
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
};
/* <=============================> */

/* 
  Draft Orders
*/
// Create draft order with payment provider and custom note
exports.createDraftOrder = async (req, res) => {
  const {
    shopName,
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

  try {
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
};
/* <=============================> */

/* 
  Webhooks
*/
// List all webhooks
exports.webhookList = async (req, res) => {
  const { shopName } = req.body;

  try {
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
};

// Delete webhook
exports.webhookDelete = async (req, res) => {
  const { shopName, address } = req.body;

  try {
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
};

// Create webhook for order creation
exports.webhookOrderCreation = async (req, res) => {
  const { shopName, address } = req.body;

  try {
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
};
/* <=============================> */
