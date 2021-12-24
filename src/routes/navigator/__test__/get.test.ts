import { app } from '../../../app';
import mongoose from 'mongoose';
import request from 'supertest';
import { getFakeQuiz } from '../../../test/fakes/quiz';
import { db } from '../../../db';

it('gets the specified quiz', async () => {
  // create some quiz
  const quiz = await db.quiz.create(getFakeQuiz());
  const response = await request(app).get(`/navigator/quizes/${quiz.id}`);
  expect(response.status).toBe(200);
});

it('returns 404 when quiz is not found', async () => {
  // create some quiz
  const response = await request(app).get(`/navigator/quizes/${mongoose.Types.ObjectId.generate().toString('hex')}`);
  expect(response.status).toBe(404);
});
