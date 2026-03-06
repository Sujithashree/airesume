const axios = require('axios');

class AIWriterAgent {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.baseUrl = 'https://api.openai.com/v1';
  }

  /**
   * Rewrite resume bullet points with AI to match job keywords
   */
  async optimizeResumeForJob(resumeContent, jobKeywords) {
    try {
      const optimizedBullets = [];

      for (const experience of resumeContent.experience) {
        const optimized = await this.enhanceBulletPoint(experience.description, jobKeywords);
        optimizedBullets.push({
          original: experience.description,
          optimized: optimized,
          keywords: this.extractKeywordsFromText(optimized),
        });
      }

      return optimizedBullets;
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw error;
    }
  }

  /**
   * Enhance a single bullet point using AI
   */
  async enhanceBulletPoint(bulletPoint, jobKeywords) {
    // Simulated enhancement - in production, use OpenAI API
    const prompt = `Rewrite this resume bullet point to be more impactful and include relevant keywords: "${bulletPoint}". 
    Target keywords to naturally incorporate: ${jobKeywords.join(', ')}. 
    Keep it concise and action-oriented.`;

    // For demo, simulate the response
    return this.simulateAIResponse(bulletPoint, jobKeywords);
  }

  /**
   * Calculate ATS Score
   */
  calculateATSScore(resume, jobKeywords) {
    let score = 0;
    const maxScore = 100;
    const resumeText = JSON.stringify(resume).toLowerCase();

    // Check for keyword matches
    const matchedKeywords = jobKeywords.filter((keyword) => resumeText.includes(keyword.toLowerCase()));
    const keywordScore = (matchedKeywords.length / jobKeywords.length) * 40;

    // Check for formatting
    let formatScore = 25;
    if (resume.content.personal.fullName && resume.content.personal.email) {
      formatScore += 5;
    }

    // Check for sections
    let sectionScore = 15;
    if (resume.content.experience && resume.content.experience.length > 0) sectionScore += 5;
    if (resume.content.education && resume.content.education.length > 0) sectionScore += 5;
    if (resume.content.skills && resume.content.skills.length > 0) sectionScore += 5;

    score = keywordScore + formatScore + sectionScore;
    return Math.min(score, maxScore);
  }

  /**
   * Provide suggestions for improvement
   */
  generateSuggestions(resume, jobKeywords, atsScore) {
    const suggestions = [];

    if (atsScore < 50) {
      suggestions.push('Add more industry-specific keywords to your resume');
    }

    if (!resume.content.skills || resume.content.skills.length === 0) {
      suggestions.push('Add a skills section to your resume');
    }

    if (!resume.content.personal.summary) {
      suggestions.push('Add a professional summary to highlight your expertise');
    }

    const resumeText = JSON.stringify(resume).toLowerCase();
    const missingKeywords = jobKeywords.filter((kw) => !resumeText.includes(kw.toLowerCase()));

    if (missingKeywords.length > 0) {
      suggestions.push(`Add these keywords to your resume: ${missingKeywords.slice(0, 5).join(', ')}`);
    }

    return suggestions;
  }

  simulateAIResponse(bulletPoint, jobKeywords) {
    // Simple simulation of AI enhancement
    const keyword = jobKeywords[0] || 'impact';
    const enhancedVersions = {
      'Led team': `Led cross-functional team with ${keyword} expertise to deliver`,
      'Managed project': `Spearheaded ${keyword}-focused project management initiative resulting in`,
      'Developed': `Architected and developed ${keyword} solution delivering`,
      'Created': `Engineered innovative solution using ${keyword} technology driving`,
    };

    for (const [key, value] of Object.entries(enhancedVersions)) {
      if (bulletPoint.includes(key)) {
        return value + ' measurable business impact with 30%+ efficiency gains';
      }
    }

    return `Leveraged ${keyword} expertise to enhance ${bulletPoint.substring(0, 20)}... driving demonstrable results`;
  }

  extractKeywordsFromText(text) {
    const keywords = new Set();
    const skillPatterns = [
      /javascript|typescript|python|java|react|nodejs|sql|aws/gi,
      /agile|scrum|leadership|communication|problem-solving/gi,
    ];

    skillPatterns.forEach((pattern) => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach((match) => keywords.add(match.toLowerCase()));
      }
    });

    return Array.from(keywords);
  }
}

module.exports = AIWriterAgent;
