import request from 'supertest';
import faker from 'faker';

import { app } from '../../../../app';
import { getFakeTeacher } from '../../../../test/fakes/teacher';

it('allows teacher to signup with email and password', async () => request(app)
  .post('/auth/teacher/new')
  .send(getFakeTeacher())
  .expect(201));

it('does not allow teacher to signup with invalid email', async () => request(app)
  .post('/auth/teacher/new')
  .send({
    email: 'invalid-email',
    password: faker.internet.password(),
  }).expect(400));

it('does not allow teacher to signup with invalid password', async () => request(app)
  .post('/auth/teacher/new')
  .send({
    email: faker.internet.email(),
    password: 'sca',
  }).expect(400));