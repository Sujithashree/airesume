# CareerForge Pro - AI Resume Architect & Job Matcher

A comprehensive web application that helps users create, optimize, and match their resumes with job descriptions using AI-powered features.

## Project Overview

CareerForge Pro is a full-stack web application built with:
- **Frontend:** React.js with Zustand for state management
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Payment:** Stripe integration
- **PDF Generation:** Puppeteer
- **AI Integration:** OpenAI API

## Features

### Week 1: The Builder Core
- Resume data entry form with split-screen preview
- Multiple resume templates (Modern, Classic, Minimal)
- Real-time preview of resume design
- Full state management

### Week 2: AI Writer & Optimization
- Job Description Analysis Agent (JD Parser)
- AI-powered resume rewriting with prompt engineering
- ATS (Applicant Tracking System) scoring
- Keyword extraction and matching

### Week 3: PDF Generation & Payment
- Puppeteer-based PDF rendering service
- Stripe payment integration
- Subscription model (Free & Pro tiers)
- Payment webhook handling

### Week 4: Final Polish & Delivery
- Cover letter generator
- User dashboard with statistics
- Job matching dashboard
- User profile management

## Project Structure

```
careerforge-pro/
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   │   ├── JDAnalysisAgent.js
│   │   │   └── AIWriterAgent.js
│   │   ├── controllers/
│   │   │   ├── AuthController.js
│   │   │   ├── ResumeController.js
│   │   │   ├── JobController.js
│   │   │   └── PaymentController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Resume.js
│   │   │   ├── JobDescription.js
│   │   │   └── Payment.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── resume.js
│   │   │   ├── job.js
│   │   │   ├── payment.js
│   │   │   └── pdf.js
│   │   ├── services/
│   │   │   ├── PDFGeneratorService.js
│   │   │   └── PaymentService.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── stripe.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ResumeBuilder.js
│   │   │   ├── JobMatcher.js
│   │   │   ├── ProfilePage.js
│   │   │   └── Pricing.js
│   │   ├── store/
│   │   │   └── index.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── ResumeBuilder.css
│   │   │   ├── JobMatcher.css
│   │   │   ├── Profile.css
│   │   │   ├── Pricing.css
│   │   │   └── Navbar.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env
└── README.md
```

## Installation & Setup

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with required environment variables
# Configure MongoDB, Stripe, OpenAI API keys

# Start the server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
# Configure API URL and Stripe public key

# Start the development server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Resume Management
- `POST /api/resume` - Create resume
- `GET /api/resume` - Get all resumes
- `GET /api/resume/:id` - Get single resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume
- `POST /api/resume/:id/optimize` - Optimize resume for job
- `POST /api/resume/:id/pdf` - Generate PDF

### Job Matching
- `POST /api/jobs` - Add job description
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job
- `PUT /api/jobs/:id/status` - Update job status
- `POST /api/jobs/:id/match` - Match resume with job

### Payments
- `POST /api/payment/intent` - Create payment intent
- `POST /api/payment/confirm` - Confirm payment
- `POST /api/payment/subscription` - Create subscription
- `GET /api/payment/history` - Get payment history
- `POST /api/payment/cancel-subscription` - Cancel subscription

## Technologies Used

### Frontend
- React 18
- React Router v6
- Zustand (State Management)
- Axios (API Client)
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Stripe API
- Puppeteer (PDF Generation)
- OpenAI API

## Key Features Implementation

### 1. Resume Builder
- Multi-step form process
- Real-time preview
- Multiple template options
- Auto-save functionality

### 2. ATS Optimization
- Keyword extraction from job descriptions
- Scoring algorithm based on keyword matches
- Suggestions for resume improvement
- AI-powered content rewriting

### 3. Job Matcher
- JD analysis and parsing
- Skill extraction
- Responsibility extraction
- Resume-to-job matching algorithm

### 4. PDF Generation
- Template-based rendering
- Multiple layout options
- Heading, experience, education, skills sections
- Professional formatting

### 5. Payment System
- Stripe integration
- Free and Pro subscription tiers
- Payment history tracking
- Subscription management

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerforge
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
OPENAI_API_KEY=sk_xxx
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_KEY=pk_test_xxx
```

## Development Workflow

1. **Week 1:** Build resume builder UI and data entry form
2. **Week 2:** Implement AI agents for job analysis and resume optimization
3. **Week 3:** Add PDF generation and Stripe payment integration
4. **Week 4:** Polish UI, add cover letter generator, deploy

## Future Enhancements

- Cover letter generation
- LinkedIn profile integration
- Job scraping from multiple sources
- Advanced analytics dashboard
- Mobile app version
- Interview preparation module
- Real-time collaboration features

## Contributing

This is part of the CareerForge Pro development project at Zaalima Development pvt ltd.

## License

Proprietary - Confidential Document

## Support

For issues and support, contact support@careerforge.pro

---

**Built with ❤️ by Zaalima Development Team**
