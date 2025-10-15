import request from 'supertest';
import app from '../app';
import { prisma } from '../utils/prisma';

let testUserId: number;

describe('User API', () => {
  // Clean up test users after tests
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'delete',
        },
      },
    });
    await prisma.$disconnect();
  });

  it('should get users with pagination', async () => {
    const res = await request(app).get('/api/users?page=1&limit=2');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.users)).toBe(true);
    expect(res.body.data.page).toBe(1);
    expect(res.body.data.limit).toBe(2);
  });

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Delete User',
        email: `delete${Date.now()}@example.com`,
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    // Access the user directly from data
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe('Delete User');

    testUserId = res.body.data.id;
  });

  it('should delete the created user', async () => {
    const deleteRes = await request(app).delete(`/api/users/${testUserId}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);
    expect(deleteRes.body.message).toContain('deleted successfully');
  });
});
