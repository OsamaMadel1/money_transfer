import User from '../users/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(request, response, next){
  try {
    const { fullName, email, password,role  } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    response.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
}

// تسجيل الدخول
export async function loginUser(request, response, next) {
  try {
    const { email, password } = request.body;

    // إيجاد المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return next('Invalid email or password');
    }

    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next('Invalid email or password');
    }

    // إنشاء التوكن
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    response.json({
       token, user:{
          id: user._id,
          name: user.fullName,
          email: user.email,
          balance:user.balance,role:
          user.role,}
        });
  } catch (error) {
    next(error);
  }
}
