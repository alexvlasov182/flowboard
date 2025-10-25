import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import { CreateUserDTO } from './user.types';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (page = 1, limit = 10, search = '') => {
  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : {};

  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, createdAt: true }, // hide password
  });

  const total = await prisma.user.count({ where });

  return { users, total, page, limit };
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: CreateUserDTO) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
};

export const updateUser = async (id: number, data: Partial<CreateUserDTO>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  //delete all pages first
  await prisma.page.deleteMany({ where: { userId: id } });

  // then delete user
  return prisma.user.delete({ where: { id } });
};
