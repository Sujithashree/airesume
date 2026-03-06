const express = require('express');
const PDFGeneratorService = require('../services/PDFGeneratorService');
const ResumeController = require('../controllers/ResumeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// PDF routes
router.post('/generate/:resumeId', authMiddleware, ResumeController.generatePDF);

module.exports = router;
