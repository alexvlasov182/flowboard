import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import { prisma } from '../../utils/prisma';
import { SignupInput, LoginInput } from './auth.types';

export class AuthService {
  static async signup(data: SignupInput) {
    const { name, email, password } = data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return user;
  }

  static async login(data: LoginInput) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken(user.id);
    return { user, token };
  }
}
