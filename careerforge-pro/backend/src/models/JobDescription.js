const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobTitle: String,
    company: String,
    description: String,
    rawText: String,
    parsedData: {
      requiredSkills: [String],
      preferredSkills: [String],
      experience: String,
      education: String,
      responsibilities: [String],
      qualifications: [String],
      salary: {
        min: Number,
        max: Number,
        currency: String,
      },
    },
    extractedKeywords: [String],
    matchScore: Number,
    source: String,
    url: String,
    status: {
      type: String,
      enum: ['new', 'matched', 'applied', 'rejected'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobDescription', jobDescriptionSchema);
