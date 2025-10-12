import {prisma} from "../utils/prisma";
import {CreatePageDTO} from '../types/user';

export const createPage = async (data: CreatePageDTO) => {
  return prisma.page.create({data});
}

export const  getUserPages = async (userId: number) => {
  return prisma.page.findMany({where: {userId}, orderBy: {createdAt: 'desc'}});
}