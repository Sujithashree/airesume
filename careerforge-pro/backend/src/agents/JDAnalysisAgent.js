const axios = require('axios');
const cheerio = require('cheerio');

class JDAnalysisAgent {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  /**
   * Scrape and parse job description
   */
  async analyzeJobDescription(jobUrl) {
    try {
      const response = await axios.get(jobUrl);
      const $ = cheerio.load(response.data);

      const jobText = $('body').text();
      const extractedData = await this.extractKeywords(jobText);

      return {
        rawText: jobText,
        extractedKeywords: extractedData.keywords,
        requiredSkills: extractedData.requiredSkills,
        preferredSkills: extractedData.preferredSkills,
        responsibilities: extractedData.responsibilities,
        qualifications: extractedData.qualifications,
      };
    } catch (error) {
      console.error('Error analyzing job description:', error);
      throw error;
    }
  }

  /**
   * Extract keywords using AI
   */
  async extractKeywords(jobText) {
    // Simulated keyword extraction - in production, use OpenAI API
    const keywords = this.extractSimpleKeywords(jobText);
    return {
      keywords,
      requiredSkills: this.filterSkills(keywords, 'required'),
      preferredSkills: this.filterSkills(keywords, 'preferred'),
      responsibilities: this.extractResponsibilities(jobText),
      qualifications: this.extractQualifications(jobText),
    };
  }

  extractSimpleKeywords(text) {
    const skillPatterns = [
      /javascript|js|typescript|python|java|c\+\+|react|angular|vue|nodejs|express|django|flask/gi,
      /aws|azure|gcp|docker|kubernetes|jenkins|cicd|git|gitlab|github/gi,
      /mongodb|postgresql|mysql|elasticsearch|redis|sql/gi,
      /agile|scrum|kanban|jira|confluence|devops|microservices/gi,
    ];

    const keywords = new Set();
    skillPatterns.forEach((pattern) => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach((match) => keywords.add(match.toLowerCase()));
      }
    });

    return Array.from(keywords);
  }

  filterSkills(keywords, type) {
    // Simple filtering logic
    if (type === 'required') {
      return keywords.slice(0, Math.ceil(keywords.length / 2));
    }
    return keywords.slice(Math.ceil(keywords.length / 2));
  }

  extractResponsibilities(text) {
    const responsibilities = [];
    const lines = text.split('\n');
    let isResponsibilitySection = false;

    lines.forEach((line) => {
      if (line.toLowerCase().includes('responsibility') || line.toLowerCase().includes('role')) {
        isResponsibilitySection = true;
      } else if (isResponsibilitySection && line.trim().startsWith('•') || line.trim().startsWith('-')) {
        responsibilities.push(line.trim().substring(1).trim());
      }
    });

    return responsibilities.slice(0, 10);
  }

  extractQualifications(text) {
    const qualifications = [];
    const lines = text.split('\n');
    let isQualificationSection = false;

    lines.forEach((line) => {
      if (line.toLowerCase().includes('qualification') || line.toLowerCase().includes('requirement')) {
        isQualificationSection = true;
      } else if (isQualificationSection && (line.trim().startsWith('•') || line.trim().startsWith('-'))) {
        qualifications.push(line.trim().substring(1).trim());
      }
    });

    return qualifications.slice(0, 10);
  }
}

module.exports = JDAnalysisAgent;
