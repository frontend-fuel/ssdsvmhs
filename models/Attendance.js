const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    shift: { type: String },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
    locationVerified: { type: Boolean, default: false },
    checkInPhoto: { type: String },
    checkOutPhoto: { type: String }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
