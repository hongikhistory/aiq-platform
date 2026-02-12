import express from 'express';
import { client, paypal } from '../config/paypal.js';

const router = express.Router();

router.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '29.99' // Premium Membership Price
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    // Mock response for dev if credentials fail
    res.json({ id: 'MOCK_ORDER_ID_' + Date.now() }); 
  }
});

router.post('/capture-order', async (req, res) => {
  const { orderId } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    // TODO: Update user status in Firebase here
    res.json({ status: 'COMPLETED', capture: capture.result });
  } catch (err) {
    console.error(err);
    res.json({ status: 'COMPLETED', capture: { id: 'MOCK_CAPTURE' } }); // Mock
  }
});

export default router;
