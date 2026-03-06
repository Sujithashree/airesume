const JobDescription = require('../models/JobDescription');
const JDAnalysisAgent = require('../agents/JDAnalysisAgent');

const jdAgent = new JDAnalysisAgent();

class JobController {
  /**
   * Add job description
   */
  static async addJob(req, res) {
    try {
      const { jobTitle, company, description, url } = req.body;

      const job = new JobDescription({
        userId: req.userId,
        jobTitle,
        company,
        description,
        rawText: description,
        url,
      });

      // Analyze job description
      const analysis = await jdAgent.analyzeJobDescription(description);
      job.parsedData = {
        requiredSkills: analysis.requiredSkills,
        preferredSkills: analysis.preferredSkills,
        responsibilities: analysis.responsibilities,
        qualifications: analysis.qualifications,
      };
      job.extractedKeywords = analysis.extractedKeywords;

      await job.save();

      res.status(201).json({
        message: 'Job added successfully',
        job,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get user's jobs
   */
  static async getUserJobs(req, res) {
    try {
      const jobs = await JobDescription.find({ userId: req.userId }).sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get single job
   */
  static async getJob(req, res) {
    try {
      const job = await JobDescription.findById(req.params.id);

      if (!job || job.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update job status (matched, applied, rejected)
   */
  static async updateJobStatus(req, res) {
    try {
      const { status } = req.body;

      const job = await JobDescription.findByIdAndUpdate(req.params.id, { status }, { new: true });

      if (!job || job.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.json({
        message: 'Job status updated successfully',
        job,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Match resume with job
   */
  static async matchWithJob(req, res) {
    try {
      const { resumeId, jobId } = req.body;
      const Resume = require('../models/Resume');
      const job = await JobDescription.findById(jobId);
      const resume = await Resume.findById(resumeId);

      if (!job || job.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Job not found' });
      }

      if (!resume || resume.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      const resumeText = JSON.stringify(resume).toLowerCase();
      const matchedKeywords = job.extractedKeywords.filter((kw) => resumeText.includes(kw.toLowerCase()));
      const matchScore = Math.round((matchedKeywords.length / job.extractedKeywords.length) * 100);

      job.matchScore = matchScore;
      job.status = matchScore > 70 ? 'matched' : 'new';
      await job.save();

      res.json({
        message: 'Match analysis complete',
        matchScore,
        matchedKeywords,
        suggestions: this.generateMatchingSuggestions(matchScore, matchedKeywords.length),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static generateMatchingSuggestions(matchScore, matchedCount) {
    const suggestions = [];

    if (matchScore < 50) {
      suggestions.push('This job has low keyword match with your resume. Consider rewriting to add relevant skills.');
    } else if (matchScore < 70) {
      suggestions.push('Decent match, but add more specific keywords mentioned in the job description.');
    } else {
      suggestions.push('Great match! Your resume aligns well with this job posting.');
    }

    suggestions.push(`You matched ${matchedCount} key requirements for this role.`);
    return suggestions;
  }
}

module.exports = JobController;
