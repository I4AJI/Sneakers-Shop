require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function createAdmin() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI missing in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        // Check existing admin
        const existingAdmin = await mongoose.connection.db.collection('users').findOne({
            email: 'admin@college.edu'
        });

        if (existingAdmin) {
            console.log('ℹ️ Admin already exists:', existingAdmin._id);
            return process.exit(0);
        }

        // Create new admin
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const result = await mongoose.connection.db.collection('users').insertOne({
            email: 'admin@college.edu',
            password: hashedPassword,
            isAdmin: true
        });

        console.log('✅ Admin created with ID:', result.insertedId);
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

createAdmin();