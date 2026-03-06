import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pricing.css';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'Create 1 Resume',
        'Basic Templates',
        'ATS Optimization',
        'Job Matcher (Limited)',
        'Email Support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      features: [
        'Unlimited Resumes',
        'All Premium Templates',
        'Advanced ATS Optimization',
        'Unlimited Job Matcher',
        'Cover Letter Generator',
        'Priority Support',
        'PDF Export',
      ],
      cta: 'Upgrade to Pro',
      highlighted: true,
    },
  ];

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that works best for you</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
            <h2>{plan.name}</h2>
            <div className="price">
              {plan.price}
              {plan.period && <span className="period">{plan.period}</span>}
            </div>

            <ul className="features">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link to={plan.name === 'Free' ? '/register' : '/register'} className="btn-primary">
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h3>Can I change plans anytime?</h3>
          <p>Yes, you can upgrade or downgrade your plan anytime. Changes will take effect at your next billing cycle.</p>
        </div>

        <div className="faq-item">
          <h3>Is there a free trial?</h3>
          <p>Yes! Start with our Free plan to create your first resume and test the ATS optimizer.</p>
        </div>

        <div className="faq-item">
          <h3>What payment methods do you accept?</h3>
          <p>We accept all major credit cards and debit cards through Stripe.</p>
        </div>

        <div className="faq-item">
          <h3>Can I cancel anytime?</h3>
          <p>Yes, you can cancel your subscription anytime. No questions asked!</p>
        </div>
      </div>
    </div>
  );
}
