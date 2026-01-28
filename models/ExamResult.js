const mongoose = require('mongoose');

const ExamResultSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examMonth: { type: String, required: true }, // e.g. "2026-01"
    subjects: [
        {
            subjectName: { type: String, required: true },
            marksObtained: { type: Number, required: true },
            totalMarks: { type: Number, required: true }
        }
    ],
    totalPercentage: { type: Number, default: 0 },
    remarks: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ExamResult || mongoose.model('ExamResult', ExamResultSchema);
