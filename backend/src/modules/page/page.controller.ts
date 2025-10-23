import { Request, Response, NextFunction } from 'express';
import * as pageService from './page.service';
import { CreatePageDTO, UpdatePageDTO } from '../page/page.types';

export const getPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pages = await pageService.getAllPages();
    res.json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
};

export const getUserPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ success: false, message: 'Invalid userId' });
    const pages = await pageService.getUserPages(userId);
    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
};

export const createPage = async (
  req: Request<{}, {}, CreatePageDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, userId } = req.body;
    const page = await pageService.createPage({ title, content, userId });
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

export const getPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid page ID' });

    const page = await pageService.getPageById(id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });

    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (
  req: Request<{ id: string }, {}, UpdatePageDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const page = await pageService.updatePage(id, { title, content });
    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

export const deletePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await pageService.deletePage(id);
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    next(error);
  }
};
