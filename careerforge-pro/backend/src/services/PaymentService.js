const { stripe, plans } = require('../config/stripe');
const Payment = require('../models/Payment');
const User = require('../models/User');

class PaymentService {
  /**
   * Create payment intent for subscription
   */
  async createPaymentIntent(userId, planType, email) {
    try {
      const plan = plans[planType];

      if (!plan || plan.price === 0) {
        throw new Error('Invalid plan or free plan selected');
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(plan.price * 100), // Convert to cents
        currency: 'usd',
        description: `CareerForge Pro - ${plan.name} Plan`,
        metadata: {
          userId,
          planType,
          email,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        amount: plan.price,
        planType,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Handle successful payment
   */
  async handlePaymentSuccess(paymentIntentId, userId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const payment = await Payment.create({
        userId,
        stripePaymentId: paymentIntentId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        plan: paymentIntent.metadata.planType,
        status: 'completed',
        billingPeriod: {
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        },
      });

      // Update user subscription
      const user = await User.findById(userId);
      user.subscription.plan = paymentIntent.metadata.planType;
      user.subscription.status = 'active';
      user.subscription.startDate = new Date();
      user.subscription.endDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
      user.subscription.stripeCustomerId = paymentIntent.customer;
      await user.save();

      return payment;
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw error;
    }
  }

  /**
   * Create subscription
   */
  async createSubscription(userId, planType, email) {
    try {
      let customer = await stripe.customers.search({
        query: `email:'${email}'`,
      });

      let customerId;
      if (customer.data.length === 0) {
        const newCustomer = await stripe.customers.create({
          email,
          metadata: { userId },
        });
        customerId = newCustomer.id;
      } else {
        customerId = customer.data[0].id;
      }

      const plan = plans[planType];
      if (!plan.priceId) {
        throw new Error('Plan not available for subscription');
      }

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: plan.priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(userId, limit = 10) {
    try {
      const payments = await Payment.find({ userId }).limit(limit).sort({ createdAt: -1 });
      return payments;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(userId) {
    try {
      const user = await User.findById(userId);

      if (!user.subscription.stripeCustomerId) {
        throw new Error('No active subscription found');
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: user.subscription.stripeCustomerId,
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        await stripe.subscriptions.del(subscriptions.data[0].id);
      }

      user.subscription.status = 'cancelled';
      user.subscription.plan = 'free';
      await user.save();

      return { message: 'Subscription cancelled successfully' };
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }
}

module.exports = PaymentService;
