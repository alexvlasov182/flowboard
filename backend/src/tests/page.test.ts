import request from 'supertest';
import app from '../app';
import { prisma } from '../utils/prisma';

describe('Page API', () => {
  let testUserId: number;
  let testPageId: number;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Page Test User',
        email: `pagetest${Date.now()}@example.com`,
        password: 'password123',
      },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    await prisma.page.deleteMany({
      where: {
        title: {
          contains: 'Test Page',
        },
      },
    });

    await prisma.user.delete({
      where: { id: testUserId },
    });

    await prisma.$disconnect();
  });

  it('should create a new page', async () => {
    const res = await request(app).post('/api/pages').send({
      title: 'Test Page',
      content: 'This is a test page content.',
      userId: testUserId,
    });

    console.log('PAGE CREATE RESPONSE', res.body);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.title).toBe('Test Page');

    testPageId = res.body.data.id;
  });

  it('should get all pages', async () => {
    const res = await request(app).get('/api/pages');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Adjust based on your API shape
    const pagesArray = Array.isArray(res.body.data.pages) ? res.body.data.pages : res.body.data; // fallback

    expect(Array.isArray(pagesArray)).toBe(true);
  });

  it('should update a page', async () => {
    const res = await request(app).put(`/api/pages/${testPageId}`).send({
      title: 'Updated Test Page',
      content: 'Updated content.',
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Updated Test Page');
  });

  it('should delete a page', async () => {
    const res = await request(app).delete(`/api/pages/${testPageId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Match the actual API message
    expect(res.body.message).toBe('Page deleted');
  });
});
