# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": {
      "plan": "free",
      "status": "active"
    }
  }
}
```

### Login User
```
POST /auth/login

Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "subscription": { ... },
  "resumeCount": 2,
  "profile": { ... }
}
```

### Update User Profile
```
PUT /auth/profile
Headers: Authorization: Bearer <token>

Body:
{
  "name": "John Smith",
  "phone": "+1-555-0123",
  "headline": "Full Stack Developer",
  "summary": "5+ years of experience...",
  "location": "San Francisco, CA"
}

Response:
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## Resume Endpoints

### Create Resume
```
POST /resume
Headers: Authorization: Bearer <token>

Body:
{
  "title": "My First Resume",
  "template": "modern",
  "content": {
    "personal": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "location": "San Francisco, CA",
      "headline": "Full Stack Developer",
      "summary": "Professional summary..."
    },
    "experience": [
      {
        "title": "Senior Developer",
        "company": "Tech Corp",
        "startDate": "2020-01",
        "endDate": "2023-12",
        "currentlyWorking": false,
        "description": "Led development of..."
      }
    ],
    "education": [ ... ],
    "skills": ["JavaScript", "React", "Node.js"],
    "certifications": [ ... ],
    "projects": [ ... ]
  }
}

Response:
{
  "message": "Resume created successfully",
  "resume": { ... }
}
```

### Get All Resumes
```
GET /resume
Headers: Authorization: Bearer <token>

Response:
[
  { resume_object },
  { resume_object }
]
```

### Get Single Resume
```
GET /resume/:id
Headers: Authorization: Bearer <token>

Response:
{
  "_id": "resume_id",
  "userId": "user_id",
  "title": "My Resume",
  "content": { ... },
  "atsScore": 85,
  "status": "draft"
}
```

### Update Resume
```
PUT /resume/:id
Headers: Authorization: Bearer <token>

Body: (same as create)

Response:
{
  "message": "Resume updated successfully",
  "resume": { ... }
}
```

### Delete Resume
```
DELETE /resume/:id
Headers: Authorization: Bearer <token>

Response:
{
  "message": "Resume deleted successfully"
}
```

### Optimize Resume for Job
```
POST /resume/:id/optimize
Headers: Authorization: Bearer <token>

Body:
{
  "jobKeywords": ["JavaScript", "React", "AWS", "Docker"]
}

Response:
{
  "message": "Resume optimized successfully",
  "resume": { ... },
  "atsScore": 78,
  "suggestions": [
    "Add more industry-specific keywords...",
    "Include specific metrics in achievements..."
  ]
}
```

### Generate PDF
```
POST /resume/:id/pdf
Headers: Authorization: Bearer <token>

Response:
{
  "message": "PDF generated successfully",
  "pdfUrl": "/uploads/pdfs/resume-123.pdf"
}
```

---

## Job Description Endpoints

### Add Job Description
```
POST /jobs
Headers: Authorization: Bearer <token>

Body:
{
  "jobTitle": "Senior Developer",
  "company": "Tech Corp",
  "url": "https://example.com/jobs/123",
  "description": "We're looking for... Requirements: JavaScript, React..."
}

Response:
{
  "message": "Job added successfully",
  "job": {
    "_id": "job_id",
    "jobTitle": "Senior Developer",
    "company": "Tech Corp",
    "extractedKeywords": ["JavaScript", "React", "AWS"],
    "parsedData": {
      "requiredSkills": [ ... ],
      "preferredSkills": [ ... ],
      "responsibilities": [ ... ],
      "qualifications": [ ... ]
    }
  }
}
```

### Get All Jobs
```
GET /jobs
Headers: Authorization: Bearer <token>

Response:
[ { job_object }, { job_object } ]
```

### Get Single Job
```
GET /jobs/:id
Headers: Authorization: Bearer <token>

Response:
{ job_object }
```

### Update Job Status
```
PUT /jobs/:id/status
Headers: Authorization: Bearer <token>

Body:
{
  "status": "matched" | "applied" | "rejected"
}

Response:
{
  "message": "Job status updated successfully",
  "job": { ... }
}
```

### Match Resume with Job
```
POST /jobs/:id/match
Headers: Authorization: Bearer <token>

Body:
{
  "resumeId": "resume_id",
  "jobId": "job_id"
}

Response:
{
  "message": "Match analysis complete",
  "matchScore": 78,
  "matchedKeywords": ["JavaScript", "React", "AWS"],
  "suggestions": [
    "Great match! Your resume aligns well...",
    "You matched 8 key requirements..."
  ]
}
```

---

## Payment Endpoints

### Create Payment Intent
```
POST /payment/intent
Headers: Authorization: Bearer <token>

Body:
{
  "planType": "pro"
}

Response:
{
  "message": "Payment intent created",
  "clientSecret": "pi_secret_xxx",
  "amount": 9.99,
  "planType": "pro"
}
```

### Confirm Payment
```
POST /payment/confirm
Headers: Authorization: Bearer <token>

Body:
{
  "paymentIntentId": "pi_xxx"
}

Response:
{
  "message": "Payment successful",
  "payment": {
    "_id": "payment_id",
    "userId": "user_id",
    "amount": 9.99,
    "status": "completed",
    "plan": "pro"
  }
}
```

### Create Subscription
```
POST /payment/subscription
Headers: Authorization: Bearer <token>

Body:
{
  "planType": "pro"
}

Response:
{
  "message": "Subscription created",
  "subscriptionId": "sub_xxx",
  "clientSecret": "pi_secret_xxx"
}
```

### Get Payment History
```
GET /payment/history?limit=10
Headers: Authorization: Bearer <token>

Response:
[
  { payment_object },
  { payment_object }
]
```

### Cancel Subscription
```
POST /payment/cancel-subscription
Headers: Authorization: Bearer <token>

Response:
{
  "message": "Subscription cancelled successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided" | "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Resume not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error",
  "status": 500
}
```

---

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

---

For more details, check individual service documentation.
