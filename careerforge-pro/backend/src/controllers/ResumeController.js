const Resume = require('../models/Resume');
const AIWriterAgent = require('../agents/AIWriterAgent');
const PDFGeneratorService = require('../services/PDFGeneratorService');

const aiWriter = new AIWriterAgent();
const pdfService = new PDFGeneratorService();

class ResumeController {
  /**
   * Create new resume
   */
  static async createResume(req, res) {
    try {
      const { title, content, template } = req.body;

      const resume = new Resume({
        userId: req.userId,
        title,
        content,
        template: template || 'modern',
        status: 'draft',
      });

      await resume.save();

      res.status(201).json({
        message: 'Resume created successfully',
        resume,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all resumes for user
   */
  static async getUserResumes(req, res) {
    try {
      const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get single resume
   */
  static async getResume(req, res) {
    try {
      const resume = await Resume.findById(req.params.id);

      if (!resume || resume.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update resume
   */
  static async updateResume(req, res) {
    try {
      const { title, content, template } = req.body;

      const resume = await Resume.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          template,
          status: 'draft',
        },
        { new: true }
      );

      if (!resume || resume.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json({
        message: 'Resume updated successfully',
        resume,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete resume
   */
  static async deleteResume(req, res) {
    try {
      const resume = await Resume.findByIdAndDelete(req.params.id);

      if (!resume || resume.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Optimize resume for job
   */
  static async optimizeForJob(req, res) {
    try {
      const { jobKeywords } = req.body;

      const resume = await Resume.findById(req.params.id);

      if (!resume || resume.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      // Calculate ATS score
      const atsScore = aiWriter.calculateATSScore(resume, jobKeywords);
      const suggestions = aiWriter.generateSuggestions(resume, jobKeywords, atsScore);

      // Optimize content
      const optimizedContent = await aiWriter.optimizeResumeForJob(resume.content, jobKeywords);

      resume.atsScore = atsScore;
      resume.atsAnalysis = {
        keywords: jobKeywords,
        missingKeywords: this.findMissingKeywords(resume, jobKeywords),
        score: atsScore,
        suggestions,
      };
      resume.optimizedContent.experience = optimizedContent;

      await resume.save();

      res.json({
        message: 'Resume optimized successfully',
        resume,
        atsScore,
        suggestions,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Generate PDF
   */
  static async generatePDF(req, res) {
    try {
      const resume = await Resume.findById(req.params.id);

      if (!resume || resume.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      const pdfPath = await pdfService.generatePDF(resume, resume.template);
      resume.pdfUrl = pdfPath;
      resume.status = 'published';
      await resume.save();

      res.json({
        message: 'PDF generated successfully',
        pdfUrl: pdfPath,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static findMissingKeywords(resume, jobKeywords) {
    const resumeText = JSON.stringify(resume).toLowerCase();
    return jobKeywords.filter((keyword) => !resumeText.includes(keyword.toLowerCase()));
  }
}

module.exports = ResumeController;
