# Testing Guide

## Unit Testing Setup

### Backend Testing

```bash
npm install --save-dev jest supertest
```

#### Test Example (tests/auth.test.js)
```javascript
const request = require('supertest');
const app = require('../src/index');

describe('Auth Endpoints', () => {
  test('POST /api/auth/register should create user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  test('POST /api/auth/login should return token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
```

### Frontend Testing

```bash
npm install --save-dev testing-library/react jest
```

## Manual Testing Checklist

### Authentication
- [ ] User can register with valid email
- [ ] User can login with correct credentials
- [ ] Token is stored in localStorage
- [ ] Protected routes redirect to login
- [ ] Logout clears token

### Resume Builder
- [ ] Can create new resume
- [ ] Can fill in personal information
- [ ] Can add experience entries
- [ ] Can add education entries
- [ ] Can add skills
- [ ] Resume preview updates in real-time
- [ ] Can save resume
- [ ] Can edit saved resume
- [ ] Can delete resume

### Job Matcher
- [ ] Can paste job description
- [ ] Keywords are extracted correctly
- [ ] Can match resume with job
- [ ] Match score is calculated
- [ ] Suggestions are provided
- [ ] Can update job status

### PDF Generation
- [ ] Can generate PDF from resume
- [ ] PDF displays correctly
- [ ] All resume content is included
- [ ] Templates render correctly

### Payments
- [ ] Can view pricing page
- [ ] Can initiate payment
- [ ] Stripe modal opens
- [ ] Payment processing works
- [ ] Subscription plan updates
- [ ] Can cancel subscription

### UI/UX
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Forms validate input
- [ ] Error messages display
- [ ] Success messages display
- [ ] Loading states work
- [ ] Navigation works

## Performance Testing

```bash
# Use Lighthouse or WebPageTest
# Target Metrics:
# - First Contentful Paint: < 1.5s
# - Largest Contentful Paint: < 2.5s
# - Cumulative Layout Shift: < 0.1
# - Time to Interactive: < 3.5s
```

## Security Testing

### OWASP Top 10 Checks
- [ ] SQL Injection - Use parameterized queries
- [ ] Broken Authentication - JWT validation
- [ ] Sensitive Data Exposure - HTTPS only
- [ ] XML External Entities - Disable XXE
- [ ] Broken Access Control - Role-based access
- [ ] Security Misconfiguration - Remove defaults
- [ ] Cross-Site Scripting - Sanitize input
- [ ] Insecure Deserialization - Validate data
- [ ] Using Components with Known Vulnerabilities - Update deps
- [ ] Insufficient Logging - Implement logging

### Testing Commands
```bash
# Check dependencies
npm audit

# OWASP dependency check
npx snyk test

# Static code analysis
npm install -g eslint
eslint src/
```

## Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:5000/api/health

# Using Artillery
npm install -g artillery
artillery quick --count 100 --duration 60 http://localhost:5000/api/health
```

## API Testing

### Using Postman
1. Import API collection
2. Set environment variables
3. Run test suite
4. Check response status codes
5. Validate response schema

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass"}'

# Get user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Browser Testing

### Browsers to Test
- Chrome (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Edge (Desktop)

### Tools
- BrowserStack for cross-browser testing
- LambdaTest for automated testing

## Accessibility Testing

```bash
# Install axe for accessibility testing
npm install --save-dev @axe-core/react

# Run tests
npx axe-core check
```

### Checklist
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Form labels present
- [ ] Alt text on images
- [ ] ARIA attributes correct

## Database Testing

```javascript
// Test database connection
desc('Database Connection', () => {
  test('Should connect to MongoDB', async () => {
    const mongoose = require('mongoose');
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    expect(connection.connection.readyState).toBe(1);
  });
});
```

## Continuous Testing

```bash
# Watch mode for tests
npm run test -- --watch

# Coverage report
npm run test -- --coverage
```

## Test Coverage Goals
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

---

For automated test setup, see CI/CD configuration.
