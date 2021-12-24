import { app } from '../../../app';
import request from 'supertest';
import { getFakeQuiz } from '../../../test/fakes/quiz';
import { db } from '../../../db';

it('should return all quizes', async () => {
  // create some quizes
  // generate random fakes count
  const count = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < count; i++) {
    await db.quiz.create(getFakeQuiz());
  }
  const response = await request(app).get('/navigator/quizes');
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(count);
});