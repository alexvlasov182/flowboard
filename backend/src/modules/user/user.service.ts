import {prisma} from '../../utils/prisma';
import { CreateUserDTO } from './user.types';

export const getAllUsers = async () => {
  return prisma.user.findMany({orderBy: {createdAt: 'desc'}});
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({where: {id}});
}

export const createUser = async (data: CreateUserDTO) => {
  return prisma.user.create({data});
}

export const deleteUser = async (id: number) => {
  return prisma.user.delete({where: {id}});
}

