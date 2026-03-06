# Testing Guide - CareerForge Pro

## 🚀 Getting Started with Testing

Follow these steps to test the application locally:

---

## Step 1: Setup Backend Environment

### Terminal 1 - Configure Backend

```bash
cd careerforge-pro/backend
```

Create/Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerforge
JWT_SECRET=test_secret_key_123
STRIPE_SECRET_KEY=sk_test_1234567890
STRIPE_PUBLISHABLE_KEY=pk_test_1234567890
STRIPE_WEBHOOK_SECRET=whsec_test_1234567890
OPENAI_API_KEY=sk_test_placeholder
NODE_ENV=development
```

---

## Step 2: Start MongoDB

### Option A: Local MongoDB (Windows)

```bash
# If MongoDB is installed, open new terminal
mongod
```

Or check if service is running:
```powershell
net start MongoDB
```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerforge
```

---

## Step 3: Seed Test Data

### Terminal 2 - Load Test Data

```bash
cd careerforge-pro/backend
node scripts/seed.js
```

✅ You should see:
```
✨ Test data seeded successfully!

📧 Test Account:
   Email: john@test.com
   Password: Test@123456

📊 Created:
   - 1 User (Pro plan)
   - 1 Resume (ATS Score: 85)
   - 3 Job Descriptions
```

---

## Step 4: Start Backend Server

### Terminal 2 (same as seed)

```bash
npm run dev
```

✅ You should see:
```
Server running on port 5000
MongoDB Connected: localhost:27017/careerforge
```

---

## Step 5: Setup Frontend Environment

### Terminal 3 - Configure Frontend

```bash
cd careerforge-pro/frontend
```

Create/Edit `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_KEY=pk_test_1234567890
```

---

## Step 6: Start Frontend

### Terminal 3

```bash
npm start
```

✅ Browser opens: http://localhost:3000

---

## 🧪 Now Start Testing!

### Test 1: Login with Test Account

1. **Page:** http://localhost:3000/login
2. **Email:** `john@test.com`
3. **Password:** `Test@123456`
4. **Expected:** Redirected to dashboard with user data

---

### Test 2: View Dashboard

**What you'll see:**
- ✅ Resume count: 1
- ✅ Job matches: 3
- ✅ Average ATS Score: 85
- ✅ Active Plan: Pro
- ✅ Recent resume card

**Try:**
- Click on resume to view details
- Check subscription status

---

### Test 3: Resume Builder

1. **Navigate:** Dashboard → Resume Builder
2. **Create New Resume:**
   - Fill in personal info
   - Add experience
   - Add education
   - Add skills
3. **Select Template:** Modern, Classic, or Minimal
4. **Expected:** Resume saved and appears in list

**Try:**
- Edit existing resume
- Change template
- View ATS score

---

### Test 4: Job Matcher

1. **Navigate:** Dashboard → Job Matcher
2. **Add Job Description:**

```
Paste this sample job:

Senior React Developer Position

We're seeking an experienced React developer to join our team.

Requirements:
- 5+ years of JavaScript experience
- React expertise
- Node.js and Express
- MongoDB or PostgreSQL
- AWS deployment
- Git version control

Responsibilities:
- Develop React components
- Build REST APIs
- Optimize database queries
- Deploy to AWS
- Mentor junior developers

Nice to have:
- TypeScript
- Docker
- GraphQL
```

3. **Expected:** Job analyzed with extracted keywords
4. **Match Resume:** Select your resume and click "Match with Resume"
5. **Results:** See match percentage and matched keywords

**Try:**
- View different jobs (already in system)
- Check match scores
- See suggestions for improvement

---

### Test 5: ATS Optimization

1. **Navigate:** Dashboard → Select resume
2. **Click:** "Optimize for Job"
3. **Add Keywords:** React, Node.js, AWS
4. **Expected:** 
   - ATS Score increases/updates
   - Suggestions provided
   - Optimized content shown

---

### Test 6: PDF Generation

1. **Navigate:** Dashboard → Select resume
2. **Click:** "Generate PDF"
3. **Expected:** PDF downloads with resume content
4. **Verify:**
   - All sections present
   - Design looks professional
   - Template applied correctly

---

### Test 7: Profile Management

1. **Navigate:** Dashboard → Profile
2. **Update:**
   - Name
   - Phone
   - Headline
   - Summary
   - Location
3. **Click:** "Save Changes"
4. **Expected:** Profile updated successfully

---

### Test 8: Pricing Page

1. **Logout** first (if you want)
2. **Navigate:** http://localhost:3000/pricing
3. **See:**
   - Free plan details
   - Pro plan details
   - FAQ section
4. **Try:** Click upgrade button (won't charge in test mode)

---

## 🔍 API Testing (Optional)

### Using PowerShell/curl

#### Test Registration
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "Test@1234"
} | ConvertTo-Json

Invoke-WebRequest -Method Post `
  -Uri "http://localhost:5000/api/auth/register" `
  -ContentType "application/json" `
  -Body $body
```

#### Test Login
```powershell
$body = @{
    email = "john@test.com"
    password = "Test@123456"
} | ConvertTo-Json

$response = Invoke-WebRequest -Method Post `
  -Uri "http://localhost:5000/api/auth/login" `
  -ContentType "application/json" `
  -Body $body

$token = ($response.Content | ConvertFrom-Json).token
Write-Host "Token: $token"
```

#### Get User Profile
```powershell
$token = "YOUR_TOKEN_HERE"

Invoke-WebRequest -Method Get `
  -Uri "http://localhost:5000/api/auth/me" `
  -Headers @{Authorization = "Bearer $token"} `
  -ContentType "application/json"
```

---

## 📋 Testing Checklist

### Authentication
- [ ] Register new account
- [ ] Login with credentials
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] Profile updates saved

### Resume
- [ ] Create resume
- [ ] Edit resume
- [ ] Delete resume
- [ ] Change template
- [ ] Generate PDF
- [ ] View ATS score

### Jobs
- [ ] Add job description
- [ ] View all jobs
- [ ] Match with resume
- [ ] See match score
- [ ] Update job status

### UI/UX
- [ ] Navigation works
- [ ] Forms validate
- [ ] Error messages display
- [ ] Loading states show
- [ ] Success messages appear
- [ ] Responsive on mobile

### Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] API calls complete
- [ ] Data persists on refresh

---

## 🐛 Debugging Tips

### Check Backend Logs
```bash
# Terminal with backend running
# Watch for error messages
# Check MongoDB connection status
```

### Check Frontend Console
```
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls
- Use React DevTools for component state
```

### Common Issues

**MongoDB Connection Failed**
```
→ Make sure mongod is running
→ Check connection string in .env
→ Verify database exists
```

**CORS Error**
```
→ Backend is running on 5000
→ Frontend has correct API_URL in .env
→ Check browser console for exact error
```

**Login Fails**
```
→ Verify seed.js ran successfully
→ Check test@example.com credentials
→ Look at backend logs for errors
```

**PDF Generation Fails**
```
→ Puppeteer requires some dependencies
→ Windows: Make sure all required DLLs present
→ Mac: Xcode command line tools might be needed
```

---

## ✨ Great! Now What?

After testing passes:

1. **Deploy** → See DEPLOYMENT.md
2. **Enhance** → Add new features
3. **Optimize** → Performance tuning
4. **Scale** → Prepare for production

---

## 📞 Need Help?

**Error with:**
- **Seed data?** → Check MongoDB is running
- **Frontend loading?** → Check backend is running on :5000
- **Login fails?** → Check .env variables
- **PDF not working?** → Check Puppeteer installation

Run debug command:
```bash
npm run dev -- --inspect
```

---

**Happy Testing! 🎉**

Report any issues you find on the development team.
