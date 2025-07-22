import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم الذي يتم عرض السجل له
  counterparty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // الطرف الآخر في التحويل
  amount: { type: Number, required: true }, 
  direction: { type: String, enum: ['in', 'out'], required: true }, // in: مستلم - out: مرسل
}, { timestamps: true });

const Transfer = mongoose.model('Transfer', transferSchema);

export default Transfer;



