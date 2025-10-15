import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { SignupInput, LoginInput } from './auth.types';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: SignupInput = req.body;
    const user = await AuthService.signup(input);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: LoginInput = req.body;
    const { user, token } = await AuthService.login(input);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};
