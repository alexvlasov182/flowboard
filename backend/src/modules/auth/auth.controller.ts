import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { z, ZodError } from 'zod';
import { generateToken } from '../../utils/jwt';
import { prisma } from '../../utils/prisma';
import { LoginInput } from './auth.types';

// Signup Validation schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// ✅ Login schema validation
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Custom HTTP error class
class HttpException extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ✅ Validate input with Zod
    const { name, email, password } = signupSchema.parse(req.body);

    // ✅ Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new HttpException(400, 'User already exists');

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    // ✅ Generate token
    const token = generateToken(user.id);

    // ✅ Send response
    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues.map((e) => e.message).join(', '),
      });
    }

    if (error instanceof HttpException) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpException(401, 'Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new HttpException(401, 'Invalid credentials');

    const token = generateToken(user.id);
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues.map((e) => e.message).join(', '),
      });
    }

    if (error instanceof HttpException) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    // fallback for unexpected errors
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
