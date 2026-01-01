require('dotenv').config();
const dns = require('dns');
// Set Google DNS to fix Atlas SRV resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to seed database...');

    // Create Admin
    const adminExists = await User.findOne({ username: 'admin@school.com' });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin@school.com',
            password: hashedPassword,
            role: 'admin',
            fullName: 'Head Administrator'
        });
        console.log('Admin user created (admin@school.com / admin123)');
    } else {
        console.log('Admin already exists.');
    }

    // Create Dummy Students
    const students = [
        { fullName: 'John Morning', username: 'john', password: 'password123', assignedShift: 'morning' },
        { fullName: 'Jane Afternoon', username: 'jane', password: 'password123', assignedShift: 'afternoon' }
    ];

    for (const s of students) {
        const exists = await User.findOne({ username: s.username });
        if (!exists) {
            const hashedPassword = await bcrypt.hash(s.password, 10);
            await User.create({
                ...s,
                password: hashedPassword,
                role: 'student'
            });
            console.log(`Student created: ${s.username}`);
        }
    }

    console.log('Seeding complete.');
    process.exit();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
