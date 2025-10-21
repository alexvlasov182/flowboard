import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import { prisma } from '../../utils/prisma';
import { SignupInput, LoginInput } from './auth.types';

// Custom Error Handler
class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// Signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: SignupInput = req.body;
    const { name, email, password } = input;

    // Validation
    if (!name || !email || !password) {
      throw new HttpException(400, 'All fields are required');
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new HttpException(400, 'User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = generateToken(user.id);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: LoginInput = req.body;
    const { email, password } = input;

    if (!email || !password) {
      throw new HttpException(400, 'Email and password required');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpException(401, 'Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new HttpException(401, 'Invalid credentials');

    const token = generateToken(user.id);
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};
