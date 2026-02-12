/* eslint-env node */
import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Environment: Sandbox or Live
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID || 'mock_client_id',
  process.env.PAYPAL_CLIENT_SECRET || 'mock_secret'
);

const client = new paypal.core.PayPalHttpClient(environment);

export { client, paypal };
