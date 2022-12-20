// app.post('/order/new', async (req, res) => {

const db = require('../firebase/firebase');

// Store new order
export const newOrderHandler = () => {
  try {
    const id = req.body.id;
    const orderJson = {
      id: id,
      customer: {
        firstName: req.body.customer.first_name,
        lastName: req.body.customer.last_name,
        phone: req.body.customer.phone,
        email: req.body.customer.email,
        tags: req.body.customer.tags,
        createdAt: req.body.customer.created_at,
        ordersCount: req.body.customer.orders_count,
        totalSpent: req.body.customer.total_spent,
        billingAddress: {
          address1: req.body.billing_address.address1,
          phone: req.body.billing_address.phone,
          city: req.body.billing_address.city,
          zip: req.body.billing_address.zip,
          province: req.body.billing_address.province,
          country: req.body.billing_address.country,
          address2: req.body.billing_address.address2,
          company: req.body.billing_address.company,
          country_code: req.body.billing_address.country_code,
          province_code: req.body.billing_address.province_code,
        },
        shippingAddress: {
          address1: req.body.shipping_address.address1,
          phone: req.body.shipping_address.phone,
          city: req.body.shipping_address.city,
          zip: req.body.shipping_address.zip,
          province: req.body.shipping_address.province,
          country: req.body.shipping_address.country,
          address2: req.body.shipping_address.address2,
          company: req.body.shipping_address.company,
          country_code: req.body.shipping_address.country_code,
          province_code: req.body.shipping_address.province_code,
        },
      },
      order: {
        createdAt: req.body.created_at,
        total: req.body.subtotal_price,
        currency: req.body.currency,
        url: req.body.order_status_url,
        status: req.body.fulfillment_status,
        note: req.body.note,
        discountCode: req.body.discount_codes,
        paymentGateway: req.body.payment_gateway_names,
        items: req.body.line_items,
      },
    };

    const response = db
      .collection('stores')
      .doc(req.body.billing_address.first_name)
      .collection('orders')
      .add(orderJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};
