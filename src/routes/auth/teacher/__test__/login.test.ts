import request from 'supertest';
import faker from 'faker';
import { app } from '../../../../app';
import { getFakeTeacher } from '../../../../test/fakes/teacher';

it('allows Teacher to login with email and password', async () => {
  const user = await global.newTeacher();
  const response = await request(app)
    .post('/auth/teacher/login')
    .send({
      email: user.email,
      password: user.password,
    }).expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('blocks access from Teacher not in the system', async () => {
  const Teacher = getFakeTeacher();
  const response = await request(app)
    .post('/auth/teacher/login')
    .send(Teacher).expect(401);

  expect(response.get('Set-Cookie')).not.toBeDefined();
});

it('blocks access from Teacher with wrong email', async () => {
  const user = await global.newTeacher();
  const response = await request(app)
    .post('/auth/Teacher/login')
    .send({
      email: faker.internet.email(),
      password: user.password,
    }).expect(401);

  expect(response.get('Set-Cookie')).not.toBeDefined();
});


it('blocks access from Teacher with wrong password', async () => {
  const user = await global.newTeacher();
  const response = await request(app)
    .post('/auth/teacher/login')
    .send({
      email: user.email,
      password: faker.internet.password(),
    }).expect(401);

  expect(response.get('Set-Cookie')).not.toBeDefined();
});
