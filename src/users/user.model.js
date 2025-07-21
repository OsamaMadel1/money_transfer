import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  balance: { type: Number, default: 1000000 },
  isActive: { type: Boolean, default: true },
  role: {type: String, enum: ['admin','user'], default: 'user'},
}, { timestamps: true });// يتم حفظ وقت إنشاء وتحديث كل مستخدم تلقائياً

const User = mongoose.model('User', userSchema);

export default User;
