export default function validateTransferMW(request, response, next) {
  const { email, amount } = request.body;

  if (!email || typeof email !== 'string') {
    return response.status(400).json({ message: 'Invalid or missing email' });
  }

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return response.status(400).json({ message: 'Invalid or missing amount' });
  }

  if (email === request.user.email) {
    return response.status(400).json({ message: 'Cannot transfer to yourself' });
  }

  next();
}
