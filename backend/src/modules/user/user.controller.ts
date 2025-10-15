import { Request, Response, NextFunction } from 'express';
import * as userService from '../user/user.service';
import { createUserSchema } from '../../validators/user.validator';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || '';

    const { users, total } = await userService.getAllUsers(page, limit, search);
    res.json({ success: true, data: { users, total, page, limit } });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createUserSchema.parse(req.body);

    const newUser = await userService.createUser(parsed);
    res.status(201).json({ success: true, data: { newUser } });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await userService.updateUser(id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: `User ${deletedUser.name} deleted successfully`,
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
