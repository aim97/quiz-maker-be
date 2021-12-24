import request from 'supertest';
import faker from 'faker';
import { app } from '../../../../app';
import { getFakeStudent } from '../../../../test/fakes/student';

it('allows student to login with email and password', async () => {
  const user = await global.newStudent();
  const response = await request(app)
    .post('/auth/student/login')
    .send({
      email: user.email,
      password: user.password,
    }).expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('blocks access from student not in the system', async () => {
  const student = getFakeStudent();
  const response = await request(app)
    .post('/auth/student/login')
    .send(student).expect(401);

  expect(response.get('Set-Cookie')).not.toBeDefined();
});

it('blocks access from student with wrong email', async () => {
  const user = await global.newStudent();
  const response = await request(app)
    .post('/auth/student/login')
    .send({
      email: faker.internet.email(),
      password: user.password,
    }).expect(401);

  expect(response.get('Set-Cookie')).not.toBeDefined();
});


it('blocks access from student with wrong password', async () => {
  const user = await global.newStudent();
  const response = await request(app)
    .post('/auth/student/login')
    .send({
      email: user.email,
      password: faker.internet.password(),
    }).expect(401);

  expect(response.get('Set-Cookie')).not.toBeDefined();
});
