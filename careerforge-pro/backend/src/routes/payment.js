const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/intent', authMiddleware, PaymentController.createPaymentIntent);
router.post('/confirm', authMiddleware, PaymentController.confirmPayment);
router.post('/subscription', authMiddleware, PaymentController.createSubscription);
router.get('/history', authMiddleware, PaymentController.getPaymentHistory);
router.post('/cancel-subscription', authMiddleware, PaymentController.cancelSubscription);

module.exports = router;
