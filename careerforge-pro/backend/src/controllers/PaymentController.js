const PaymentService = require('../services/PaymentService');
const User = require('../models/User');

const paymentService = new PaymentService();

class PaymentController {
  /**
   * Create payment intent
   */
  static async createPaymentIntent(req, res) {
    try {
      const { planType } = req.body;

      const user = await User.findById(req.userId);
      const paymentIntentData = await paymentService.createPaymentIntent(req.userId, planType, user.email);

      res.json({
        message: 'Payment intent created',
        ...paymentIntentData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Confirm payment
   */
  static async confirmPayment(req, res) {
    try {
      const { paymentIntentId } = req.body;

      const payment = await paymentService.handlePaymentSuccess(paymentIntentId, req.userId);

      res.json({
        message: 'Payment successful',
        payment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create subscription
   */
  static async createSubscription(req, res) {
    try {
      const { planType } = req.body;

      const user = await User.findById(req.userId);
      const subscription = await paymentService.createSubscription(req.userId, planType, user.email);

      res.json({
        message: 'Subscription created',
        ...subscription,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get payment history
   */
  static async getPaymentHistory(req, res) {
    try {
      const limit = req.query.limit || 10;
      const payments = await paymentService.getPaymentHistory(req.userId, limit);

      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(req, res) {
    try {
      const result = await paymentService.cancelSubscription(req.userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;
