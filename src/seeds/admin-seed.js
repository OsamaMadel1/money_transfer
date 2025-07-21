import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose from 'mongoose';
import MongoUsersRepository from '../users/user.repository.js';

async function adminSeed(params) {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/money_transfer_db');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }

    const repository = new MongoUsersRepository;
    const password = crypto.randomBytes(8).toString('hex');
    const passwordHashed = await bcrypt.hash(password,10);

    await repository.add({
        fullName: 'admin',
        email: 'admin@gmail.com',
        password: passwordHashed,
        role: 'admin'
    });

    console.log('='.repeat(50));
    console.log('email:','admin@gmail.com');
    console.log('password',password);
    console.log('='.repeat(50));

    await mongoose.disconnect();
}

adminSeed();