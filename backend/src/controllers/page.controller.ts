import { Request, Response, NextFunction } from "express";
import * as pageService from "../services/page.service";

export const createPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {title, content, userId} = req.body;
    const page = await pageService.createPage({title, content, userId});
    res.status(201).json({success: true, data: page});
  } catch (error) {
    next(error)
  }
}

export const getUserPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    const pages = await pageService.getUserPages(userId);
    res.status(201).json({success: true, data: pages})
  } catch (error) {
    next(error)
  }
}