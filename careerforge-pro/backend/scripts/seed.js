// Seed script to populate test data in MongoDB
// Run from: node scripts/seed.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const User = require('../src/models/User');
const Resume = require('../src/models/Resume');
const JobDescription = require('../src/models/JobDescription');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerforge', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data (optional)
    await User.deleteMany({});
    await Resume.deleteMany({});
    await JobDescription.deleteMany({});
    console.log('Cleared existing data');

    // Create test user
    const testUser = new User({
      name: 'John Developer',
      email: 'john@test.com',
      password: 'Test@123456', // Will be hashed
      subscription: {
        plan: 'pro',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      profile: {
        phone: '+1 (555) 123-4567',
        headline: 'Full Stack Developer | 5+ Years Experience',
        summary: 'Passionate about building scalable web applications. Expertise in JavaScript, React, Node.js, and cloud technologies.',
        location: 'San Francisco, CA',
      },
    });

    await testUser.save();
    console.log('✅ Test user created:', testUser.email);

    // Create test resume
    const testResume = new Resume({
      userId: testUser._id,
      title: 'Full Stack Developer Resume',
      content: {
        personal: {
          fullName: 'John Developer',
          email: 'john@test.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          headline: 'Full Stack Developer | 5+ Years Experience',
          summary:
            'Passionate about building scalable web applications with modern technology stack. Experienced in JavaScript, React, Node.js, and cloud deployment.',
        },
        experience: [
          {
            title: 'Senior Full Stack Developer',
            company: 'Tech Innovations Inc',
            startDate: '2021-01',
            endDate: '2024-02',
            currentlyWorking: true,
            description:
              'Led development of microservices architecture handling 1M+ daily users. Implemented CI/CD pipeline reducing deployment time by 80%. Mentored team of 5 junior developers.',
          },
          {
            title: 'Full Stack Developer',
            company: 'StartUp Solutions',
            startDate: '2019-06',
            endDate: '2020-12',
            currentlyWorking: false,
            description:
              'Developed responsive web applications using React and Node.js. Optimized database queries improving performance by 45%. Integrated third-party APIs and payment systems.',
          },
          {
            title: 'Junior Developer',
            company: 'Web Agency Pro',
            startDate: '2018-01',
            endDate: '2019-05',
            currentlyWorking: false,
            description:
              'Built and maintained client websites using HTML, CSS, JavaScript. Participated in Agile/Scrum development process. Assisted with debugging and code reviews.',
          },
        ],
        education: [
          {
            school: 'University of California',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2014-09',
            endDate: '2018-05',
            details: 'GPA: 3.8/4.0, Dean\'s List all semesters',
          },
          {
            school: 'Tech Boot Camp Online',
            degree: 'Certificate',
            field: 'Full Stack Development',
            startDate: '2017-06',
            endDate: '2017-12',
            details: 'Intensive 6-month program focusing on MERN stack',
          },
        ],
        skills: [
          'JavaScript',
          'React',
          'Node.js',
          'Express',
          'MongoDB',
          'PostgreSQL',
          'AWS',
          'Docker',
          'Git',
          'REST APIs',
          'GraphQL',
          'TypeScript',
          'CSS3',
          'HTML5',
          'Agile',
        ],
        certifications: [
          {
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2023-06',
          },
          {
            name: 'Google Cloud Associate Cloud Engineer',
            issuer: 'Google Cloud',
            date: '2023-03',
          },
        ],
        projects: [
          {
            name: 'E-Commerce Platform',
            description: 'Full-featured online store with payment integration',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            url: 'https://github.com/example/ecommerce',
          },
          {
            name: 'Real-time Chat Application',
            description: 'WebSocket-based messaging platform',
            technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
            url: 'https://github.com/example/chat',
          },
        ],
      },
      template: 'modern',
      atsScore: 85,
      atsAnalysis: {
        keywords: ['JavaScript', 'React', 'Node.js', 'AWS', 'MongoDB'],
        missingKeywords: ['Kubernetes', 'Machine Learning'],
        score: 85,
        suggestions: [
          'Strong match with most common full-stack requirements',
          'Consider adding DevOps/Infrastructure experience',
          'Good keyword density and structure',
        ],
      },
      status: 'published',
    });

    await testResume.save();
    console.log('✅ Test resume created');

    // Create test job descriptions
    const jobDescriptions = [
      {
        userId: testUser._id,
        jobTitle: 'Senior React Developer',
        company: 'Digital Innovations Ltd',
        description: `We're looking for an experienced React developer to join our growing team.

Requirements:
- 5+ years of JavaScript/React experience
- Strong understanding of REST APIs and GraphQL
- Experience with Node.js backend
- AWS or Cloud deployment experience
- Git and version control
- Agile methodology experience

Responsibilities:
- Develop and maintain React components
- Collaborate with backend teams
- Optimize application performance
- Conduct code reviews
- Mentor junior developers

Nice to have:
- TypeScript experience
- Docker/Kubernetes knowledge
- CI/CD pipeline experience
- Testing frameworks (Jest, React Testing Library)`,
        rawText: `Senior React Developer - Digital Innovations Ltd
Requirements: 5+ years JavaScript React NodeJS AWS Git Agile
Responsibilities: React development backend collaboration optimization code reviews mentoring
Nice to have: TypeScript Docker Kubernetes CI/CD Jest testing`,
        extractedKeywords: [
          'React',
          'JavaScript',
          'Node.js',
          'REST APIs',
          'GraphQL',
          'AWS',
          'Git',
          'Agile',
          'TypeScript',
          'Docker',
        ],
        parsedData: {
          requiredSkills: [
            'JavaScript',
            'React',
            'Node.js',
            'AWS',
            'Git',
            'REST APIs',
          ],
          preferredSkills: [
            'TypeScript',
            'Docker',
            'Kubernetes',
            'GraphQL',
            'CI/CD',
          ],
          experience: '5+ years',
          education: 'Bachelor in Computer Science or related field',
          responsibilities: [
            'Develop React components',
            'Collaborate with backend teams',
            'Optimize performance',
            'Code reviews',
            'Mentor junior developers',
          ],
          qualifications: [
            'Strong JavaScript knowledge',
            'React expertise',
            'REST API experience',
            'Version control',
          ],
        },
        matchScore: 89,
        status: 'matched',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: testUser._id,
        jobTitle: 'Full Stack JavaScript Developer',
        company: 'CloudTech Solutions',
        description: `Full Stack JavaScript Developer Position

About the role:
We're seeking a talented full-stack developer to work on our modern web platform.

Key Skills Needed:
- JavaScript/ES6+
- React or Vue.js
- Node.js and Express
- MongoDB or PostgreSQL
- Docker containers
- AWS deployment

Your responsibilities:
- Build responsive web applications
- Design and implement APIs
- Database design and optimization
- Deploy and maintain applications
- Work in agile teams`,
        rawText: `Full Stack JavaScript Developer - CloudTech Solutions
JavaScript React Vue NodeJS Express MongoDB PostgreSQL Docker AWS MongoDB`,
        extractedKeywords: [
          'JavaScript',
          'React',
          'Node.js',
          'MongoDB',
          'Docker',
          'AWS',
          'Express',
        ],
        parsedData: {
          requiredSkills: [
            'JavaScript',
            'React or Vue',
            'Node.js',
            'Express',
            'MongoDB',
          ],
          preferredSkills: ['Docker', 'AWS', 'PostgreSQL', 'GraphQL'],
          experience: '3+ years',
          responsibilities: [
            'Build web applications',
            'Design APIs',
            'Database optimization',
            'Deploy applications',
          ],
          qualifications: [
            'JavaScript proficiency',
            'Frontend framework knowledge',
            'Backend development',
          ],
        },
        matchScore: 92,
        status: 'matched',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        userId: testUser._id,
        jobTitle: 'DevOps Engineer',
        company: 'Infrastructure Pro',
        description: `DevOps Engineer - Infrastructure Pro

Seeking experienced DevOps engineer for our infrastructure team.

Requirements:
- Kubernetes and Docker expertise
- AWS or Azure experience
- CI/CD pipeline implementation
- Infrastructure as Code (Terraform, CloudFormation)
- Linux system administration
- Monitoring and logging systems`,
        rawText: `DevOps Engineer - Infrastructure Pro
Kubernetes Docker AWS Azure Terraform Infrastructure Linux Monitoring`,
        extractedKeywords: [
          'Kubernetes',
          'Docker',
          'AWS',
          'Terraform',
          'CI/CD',
          'Linux',
        ],
        parsedData: {
          requiredSkills: [
            'Kubernetes',
            'Docker',
            'AWS or Azure',
            'Terraform',
            'Linux',
          ],
          preferredSkills: ['CI/CD', 'Monitoring', 'Python scripting'],
          experience: '5+ years',
          responsibilities: [
            'Manage infrastructure',
            'Implement CI/CD',
            'Monitor systems',
            'Optimize deployments',
          ],
          qualifications: [
            'Container orchestration',
            'Cloud platforms',
            'Scripting',
          ],
        },
        matchScore: 65,
        status: 'new',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
    ];

    await JobDescription.insertMany(jobDescriptions);
    console.log('✅ Test job descriptions created');

    console.log('\n✨ Test data seeded successfully!');
    console.log('\n📧 Test Account:');
    console.log('   Email: john@test.com');
    console.log('   Password: Test@123456');
    console.log('\n📊 Created:');
    console.log('   - 1 User (Pro plan)');
    console.log('   - 1 Resume (ATS Score: 85)');
    console.log('   - 3 Job Descriptions');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
