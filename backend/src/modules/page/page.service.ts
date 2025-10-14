import {prisma} from "../../utils/prisma";
import {CreatePageDTO, UpdatePageDTO} from '../page/page.types';

export const getAllPages = async () => {
  return prisma.page.findMany({include: {user: true}, orderBy: {createdAt: "desc"}});
}

export const  getUserPages = async (userId: number) => {
  return prisma.page.findMany({where: {userId}, orderBy: {createdAt: 'desc'}});
}

export const createPage = async (data: CreatePageDTO) => {
  return prisma.page.create({data});
}

export const updatePage = async (id: number, data: UpdatePageDTO) => {
  return prisma.page.update({where: {id}, data})
}

export const deletePage = async (id: number) => {
  return prisma.page.delete({where: {id}});
}
