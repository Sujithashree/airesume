# Project Architecture

## System Architecture

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼──────────────┐
│   Express Server      │
│   (Backend/API)       │
└────────┬──────────────┘
         │
         ├─────────────────┐─────────────────┬─────────────┐
         │                 │                 │             │
    ┌────▼─────┐      ┌───▼────┐       ┌───▼──┐      ┌───▼──┐
    │ MongoDB   │      │Stripe  │       │OpenAI│      │Files │
    │ Database  │      │Payment │       │ API  │      │(PDF) │
    └──────────┘      └────────┘       └──────┘      └──────┘
```

## Data Flow

### Resume Creation & Optimization
1. User enters resume data in builder
2. Frontend sends to backend API
3. Backend stores in MongoDB
4. AI Writer Agent analyzes and optimizes
5. Frontend displays ATS score and suggestions

### Job Matching
1. User pastes job description
2. JD Analysis Agent extracts keywords
3. System matches with user's resume
4. Returns match score and recommendations

### PDF Generation
1. User requests PDF export
2. Backend uses Puppeteer to render
3. Sends file to frontend
4. User downloads resume

## State Management

### Frontend (Zustand Stores)
- `useAuthStore`: User authentication & profile
- `useResumeStore`: Resume CRUD operations
- `useJobStore`: Job posting management

### Backend (MongoDB Collections)
- Users
- Resumes
- JobDescriptions
- Payments

## Authentication Flow

1. User registers/logs in
2. Backend validates credentials
3. JWT token generated
4. Token stored in localStorage
5. Included in API headers (Bearer token)
6. authMiddleware verifies on each request

## API Rate Limiting & Security

- CORS enabled for frontend origin
- Helmet.js for security headers
- JWT authentication on protected routes
- Input validation on all endpoints
- Error handling middleware

## Payment Flow

1. User selects Pro plan
2. Frontend calls `/payment/intent`
3. Stripe PaymentIntent created
4. Frontend confirms payment with Stripe
5. Payment confirmed with backend
6. User subscription updated
7. PDF generation unlocked

## Deployment Architecture

### Recommended Setup
- Frontend: Vercel or Netlify
- Backend: Heroku or AWS EC2
- Database: MongoDB Atlas
- Files: AWS S3 or local storage
- Payment: Stripe (production keys)

---

For more details, see individual component documentation.
