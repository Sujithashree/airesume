const express = require('express');
const JobController = require('../controllers/JobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, JobController.addJob);
router.get('/', authMiddleware, JobController.getUserJobs);
router.get('/:id', authMiddleware, JobController.getJob);
router.put('/:id/status', authMiddleware, JobController.updateJobStatus);
router.post('/:id/match', authMiddleware, JobController.matchWithJob);

module.exports = router;
