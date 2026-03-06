const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      personal: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        headline: String,
        summary: String,
      },
      experience: [
        {
          title: String,
          company: String,
          startDate: String,
          endDate: String,
          currentlyWorking: Boolean,
          description: String,
        },
      ],
      education: [
        {
          school: String,
          degree: String,
          field: String,
          startDate: String,
          endDate: String,
          details: String,
        },
      ],
      skills: [String],
      certifications: [
        {
          name: String,
          issuer: String,
          date: String,
        },
      ],
      projects: [
        {
          name: String,
          description: String,
          technologies: [String],
          url: String,
        },
      ],
    },
    atsScore: {
      type: Number,
      default: 0,
    },
    atsAnalysis: {
      keywords: [String],
      missingKeywords: [String],
      score: Number,
      suggestions: [String],
    },
    optimizedContent: {
      experience: [
        {
          original: String,
          optimized: String,
          keywords: [String],
        },
      ],
    },
    template: {
      type: String,
      enum: ['modern', 'classic', 'minimal'],
      default: 'modern',
    },
    pdfUrl: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
