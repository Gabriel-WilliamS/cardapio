import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('should create user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johnDoe@gmail.com',
        password: '123456',
      })
      .expect(201);
  });

  it('should authen user', async () => {
    const auth_token = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'johnDoe@gmail.com',
        password: '123456',
      });

    token = auth_token.body.access_token;

    expect(auth_token.status).toBe(200);
  });

  it('should find user', async () => {
    const user = await request(app.getHttpServer())
      .get('/users/findByEmail')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'johnDoe@gmail.com',
      });

    const requestUserById = await request(app.getHttpServer())
      .get(`/users/${user.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(requestUserById.status).toBe(200);
  });

  it(' should find user by email', async () => {
    const user = await request(app.getHttpServer())
      .get('/users/findByEmail')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'johnDoe@gmail.com',
      });

    expect(user.status).toBe(200);
  });

  it('should give error 404 when trying to fetch a non-existent user', () => {
    return request(app.getHttpServer())
      .get('/users/idInvalido')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  it('should findMany users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.status).toBe(200);

    if (response.body.length > 0) {
      expect(response.body[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    }
  });

  it('should update user', async () => {
    const user = await request(app.getHttpServer())
      .get('/users/findByEmail')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'johnDoe@gmail.com',
      });

    const updateUser = await request(app.getHttpServer())
      .patch(`/users/${user.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Updated',
        email: 'johnDoeUpdated@gmail.com',
      });

    const response = await request(app.getHttpServer())
      .get(`/users/${user.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(updateUser.status).toBe(200);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: response.body.id,
      name: 'John Doe Updated',
      email: 'johnDoeUpdated@gmail.com',
    });
  });

  it('should delete user', async () => {
    const user = await request(app.getHttpServer())
      .get('/users/findByEmail')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'johnDoeUpdated@gmail.com',
      });

    const response = await request(app.getHttpServer())
      .delete(`/users/${user.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
