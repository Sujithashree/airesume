const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class PDFGeneratorService {
  constructor() {
    this.outputDir = path.join(__dirname, '../../uploads/pdfs');
  }

  /**
   * Generate PDF from resume HTML
   */
  async generatePDF(resume, template = 'modern') {
    try {
      const html = this.generateResumeHTML(resume, template);
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdfPath = path.join(this.outputDir, `resume-${resume._id}.pdf`);

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      });

      await browser.close();
      return pdfPath;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  /**
   * Generate HTML from resume data
   */
  generateResumeHTML(resume, template) {
    const { personal, experience, education, skills, certifications } = resume.content;

    let html = this.getBaseHTML(template);

    // Personal section
    html += `
      <div class="personal">
        <h1>${personal.fullName || 'Your Name'}</h1>
        <p class="headline">${personal.headline || 'Professional'}</p>
        <div class="contact">
          ${personal.email ? `<span>${personal.email}</span>` : ''}
          ${personal.phone ? `<span>${personal.phone}</span>` : ''}
          ${personal.location ? `<span>${personal.location}</span>` : ''}
        </div>
      </div>
    `;

    if (personal.summary) {
      html += `
        <section class="summary">
          <h2>Professional Summary</h2>
          <p>${personal.summary}</p>
        </section>
      `;
    }

    // Experience section
    if (experience && experience.length > 0) {
      html += '<section class="experience"><h2>Experience</h2>';
      experience.forEach((exp) => {
        html += `
          <div class="position">
            <div class="position-header">
              <h3>${exp.title || 'Job Title'}</h3>
              <span class="company">${exp.company || 'Company'}</span>
            </div>
            <p class="dates">${exp.startDate || ''} - ${exp.endDate || (exp.currentlyWorking ? 'Present' : '')}</p>
            <p class="description">${exp.description || ''}</p>
          </div>
        `;
      });
      html += '</section>';
    }

    // Education section
    if (education && education.length > 0) {
      html += '<section class="education"><h2>Education</h2>';
      education.forEach((edu) => {
        html += `
          <div class="degree">
            <h3>${edu.degree || 'Degree'}</h3>
            <p class="school">${edu.school || 'School'}</p>
            <p class="field">${edu.field || 'Field'}</p>
            <p class="dates">${edu.startDate || ''} - ${edu.endDate || ''}</p>
          </div>
        `;
      });
      html += '</section>';
    }

    // Skills section
    if (skills && skills.length > 0) {
      html += '<section class="skills"><h2>Skills</h2>';
      html += '<div class="skills-list">' + skills.map((skill) => `<span class="skill">${skill}</span>`).join('') + '</div>';
      html += '</section>';
    }

    // Certifications section
    if (certifications && certifications.length > 0) {
      html += '<section class="certifications"><h2>Certifications</h2>';
      certifications.forEach((cert) => {
        html += `
          <div class="certification">
            <h3>${cert.name || 'Certification'}</h3>
            <p class="issuer">${cert.issuer || 'Issuer'}</p>
            <p class="date">${cert.date || ''}</p>
          </div>
        `;
      });
      html += '</section>';
    }

    html += '</body></html>';
    return html;
  }

  /**
   * Get base HTML template
   */
  getBaseHTML(template) {
    const templates = {
      modern: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            h1 { font-size: 28px; margin: 0 0 5px 0; color: #1a5490; }
            .headline { font-size: 14px; color: #666; margin: 0 0 10px 0; }
            .contact { font-size: 12px; color: #666; margin-bottom: 15px; display: flex; gap: 15px; }
            .personal { border-bottom: 3px solid #1a5490; padding-bottom: 15px; margin-bottom: 20px; }
            section { margin-bottom: 20px; }
            h2 { font-size: 16px; color: #1a5490; border-bottom: 2px solid #1a5490; padding-bottom: 5px; margin-bottom: 10px; }
            .position-header { display: flex; justify-content: space-between; align-items: baseline; }
            h3 { margin: 10px 0 5px 0; font-size: 14px; }
            .company { color: #666; font-size: 12px; }
            .dates { color: #999; font-size: 11px; margin: 0; }
            .description { margin: 5px 0; font-size: 12px; }
            .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
            .skill { background: #e8f0f7; color: #1a5490; padding: 4px 8px; border-radius: 3px; font-size: 11px; }
          </style>
        </head>
        <body>
      `,
      classic: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Times New Roman', Times, serif; line-height: 1.5; color: #000; margin: 0; padding: 30px; }
            h1 { font-size: 24px; margin: 0 0 10px 0; text-align: center; }
            .headline { text-align: center; font-size: 12px; margin-bottom: 10px; }
            .contact { text-align: center; font-size: 10px; margin-bottom: 20px; }
            section { margin-bottom: 20px; }
            h2 { font-size: 14px; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; }
            h3 { margin: 8px 0 2px 0; font-size: 12px; }
            .dates { font-size: 10px; margin: 0; }
            .description { margin: 3px 0; font-size: 11px; }
          </style>
        </head>
        <body>
      `,
      minimal: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.4; color: #222; margin: 0; padding: 15px; }
            h1 { font-size: 22px; margin: 0 0 3px 0; }
            .headline { font-size: 12px; color: #555; }
            .contact { font-size: 11px; color: #555; margin-bottom: 10px; }
            section { margin-bottom: 15px; }
            h2 { font-size: 13px; margin: 10px 0 5px 0; }
            h3 { margin: 6px 0 2px 0; font-size: 12px; font-weight: bold; }
            .dates { font-size: 10px; color: #666; }
            .description { margin: 2px 0; font-size: 11px; }
          </style>
        </head>
        <body>
      `,
    };

    return templates[template] || templates.modern;
  }
}

module.exports = PDFGeneratorService;
