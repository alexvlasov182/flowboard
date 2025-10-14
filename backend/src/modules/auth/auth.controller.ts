import {Request, Response, NextFunction} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {prisma} from '../../utils/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {name, email, password: hashed},
    });

    res.status(201).json({success: true, data: user});
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where: {email}});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({success: false, message: "Invalid credentials"});
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: "7d"});
    res.json({success: true, token});
  } catch (error) {
    next(error);
  }
}