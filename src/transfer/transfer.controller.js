import InsufficientBalanceError from '../shared/errors/insufficient-balance-error.js';
import NotFoundError from '../shared/errors/not-found-error.js';
import User from '../users/user.model.js';
import MongoTransferRepository from './transfer.repository.js';


const repository = new MongoTransferRepository();

export async function makeTransfer(request, response, next) {

    const sender = request.user;
    const { email, amount } = request.body;

    // جلب المستلم
    const receiver = await User.findOne({ email });
    if (!receiver || !receiver.isActive) {
       throw new NotFoundError('Receiver not found or inactive');
    }

    // التحقق من الرصيد
    if (typeof sender.balance !== 'number' || typeof receiver.balance !== 'number') {
      return response.status(500).json({ message: 'Invalid balance data type' });
    }

    if (sender.balance < amount) {
      throw new InsufficientBalanceError( 'Insufficient balance');
    }

    // تعديل الأرصدة
    sender.balance -= amount;
    receiver.balance += amount;

    await Promise.all([sender.save(), receiver.save()]);

    // تسجيل التحويل
    await request.transfersRepository.createTransferEntries({
      senderId: sender._id,
      receiverId: receiver._id,
      amount,
    });

    response.status(200).json({ message: 'Transfer completed successfully' });
}


export async function getMyTransfers(request, response, next) {
      const transfers = await request.transfersRepository.getUserTransfers(request.user._id);
    response.json({ count: transfers.length, transfers });

  
}

export async function getAllTransfers(request, response, next) {
      const transfers = await request.transfersRepository.getAllTransfers();
    response.json({ count: transfers.length, transfers });
}
