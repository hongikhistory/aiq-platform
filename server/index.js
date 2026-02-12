/* eslint-env node */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import lectureRoutes from './routes/lectures.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

// Security Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://*.paypal.com", "https://*.paypalobjects.com"],
      imgSrc: ["'self'", "data:", "https://placehold.co", "https://*.paypal.com"],
      frameSrc: ["'self'", "https://*.paypal.com", "https://www.youtube.com"],
      connectSrc: ["'self'", "https://*.paypal.com"],
    },
  },
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/lectures', lectureRoutes);
app.use('/api/payments', paymentRoutes);

// Serve static files in production
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  // Handle SPA fallback
  app.get(/(.*)/, (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
