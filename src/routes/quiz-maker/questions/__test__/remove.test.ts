/**
 * pre conditions:
 * 1. a Teacher must be created
 * 2. a Teacher must be logged in
 * 3. the teacher must have created a quiz
 * 4. The quiz is not published yet
 * 4. The question fields must be provided correctly
 * 
 * post conditions
 * 1. The questions list of the quiz is increased by 1, the one we added.
 */
import request from 'supertest';
import faker from 'faker';
 
import { app } from '../../../../app';
import { db } from '../../../../db';

import { getFakeQuiz, getFakeMCQ } from '../../../../test/fakes/quiz';
 
it('allows the quiz owner to delete an existing questions from an existing quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  const response = await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', teacherAccessCookies)
    .send(getFakeMCQ())
    .expect(201);

  // choose a random question
  const question = response.body.questions[Math.floor(Math.random() * response.body.questions.length)];

  await request(app)
    .delete(`/quiz-maker/${quiz.id}/questions/${question.id}/remove`)
    .set('Cookie', teacherAccessCookies)
    .expect(200);
});
