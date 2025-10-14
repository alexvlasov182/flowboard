import {Request, Response, NextFunction} from 'express'
import * as userService from '../user/user.service';


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json({success: true, data: users});
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password} = req.body;
    await userService.createUser({name, email, password});
    const users = await userService.getAllUsers();
    res.status(201).json({success: true, data: users});
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    const users = await userService.getAllUsers();
    res.json({success: true, data: users});
  } catch (error) {
    next(error);
  }
}