const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

const plans = {
  free: {
    name: 'Free',
    price: 0,
    resumes: 1,
    coverLetters: 0,
    templates: 3,
    atsOptimization: true,
    priceId: null,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    resumes: 'Unlimited',
    coverLetters: 'Unlimited',
    templates: 'All',
    atsOptimization: true,
    priceId: process.env.STRIPE_PRICE_ID_PRO,
  },
};

module.exports = { stripe, stripeConfig, plans };
