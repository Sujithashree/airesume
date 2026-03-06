const express = require('express');
const ResumeController = require('../controllers/ResumeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, ResumeController.createResume);
router.get('/', authMiddleware, ResumeController.getUserResumes);
router.get('/:id', authMiddleware, ResumeController.getResume);
router.put('/:id', authMiddleware, ResumeController.updateResume);
router.delete('/:id', authMiddleware, ResumeController.deleteResume);
router.post('/:id/optimize', authMiddleware, ResumeController.optimizeForJob);
router.post('/:id/pdf', authMiddleware, ResumeController.generatePDF);

module.exports = router;
