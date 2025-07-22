import Transfer from './transfer.model.js';

export default class MongoTransferRepository {
  
  async createTransferEntries({ senderId, receiverId, amount }) {
    // واحدة للخارج (السالب)، وواحدة للداخل (الموجب)
    const [outTransfer, inTransfer] = await Promise.all([
      Transfer.create({
        user: senderId,
        counterparty: receiverId,
        amount,
        direction: 'out'
      }),
      Transfer.create({
        user: receiverId,
        counterparty: senderId,
        amount,
        direction: 'in'
      })
    ]);

    return { outTransfer, inTransfer };
  }

  async getUserTransfers(userId) {
    const transfers = await Transfer.find({ user: userId })
      .populate('counterparty', 'fullName email')
      .sort({ createdAt: -1 }).lean();

    return transfers.map(t => ({
       ...t,
       signedAmount: t.direction === 'out' ? -t.amount : +t.amount,
  }));
  }

  async getAllTransfers() {
    return await Transfer.find({})
      .populate('user', 'fullName email')
      .populate('counterparty', 'fullName email')
      .sort({ createdAt: -1 });
  }
}
