import request from 'supertest';
import faker from 'faker';
import { app } from '../../../../app';
import { getFakeStudent } from '../../../../test/fakes/student';

it('allows student to signup with email and password', async () => request(app)
  .post('/auth/student/new')
  .send(getFakeStudent())
  .expect(201));

it('does not allow student to signup with invalid email', async () => request(app)
  .post('/auth/student/new')
  .send({
    email: 'invalid-email',
    password: faker.internet.password(),
  }).expect(400));

it('does not allow student to signup with invalid password', async () => request(app)
  .post('/auth/student/new')
  .send({
    email: faker.internet.email(),
    password: 'sca',
  }).expect(400));