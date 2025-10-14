import {Request, Response, NextFunction} from 'express'
import * as userService from '../user/user.service';
import {CreateUserSchema} from '../user/user.types'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";

    const {users, total} = await userService.getAllUsers(page, limit, search);
    res.json({success: true, data: {users, total}})
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CreateUserSchema.parse(req.body);

    const newUser = await userService.createUser(parsed);
    res.status(201).json({ success: true, data: { newUser } });
  } catch (error) {
    next(error);
  }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
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
