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

import { getFakeQuiz, getFakeNumericProblem } from '../../../../test/fakes/quiz';

it('allows the quiz owner to add a questions to an existing quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  const questionsCount = quiz.questions.length;
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addNumericProblem`)
    .set('Cookie', teacherAccessCookies)
    .send(getFakeNumericProblem())
    .expect(201);

  const q = await db.quiz.findById(quiz.id);
  expect(q).not.toBeNull()
  expect(q!.questions.length).toEqual(questionsCount + 1);
});

//! authentication tests
it('allows only allows owner teacher to add a question', async () => {
  const teacher = await global.newTeacher();
  const anotherTeacher = await global.newTeacher();
  const anotherTeacherAccessCookies = await global.getTeacherAccessCookies(anotherTeacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addNumericProblem`)
    .set('Cookie', anotherTeacherAccessCookies)
    .send(getFakeNumericProblem())
    .expect(404);
});

it('doesn`t allow a student to add questions', async () => {
  const teacher = await global.newStudent();
  const student = await global.newStudent();
  const studentAccessCookies = await global.getStudentAccessCookies(student);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addNumericProblem`)
    .set('Cookie', studentAccessCookies)
    .send(getFakeNumericProblem())
    .expect(401);
});

//!validation tests

it('only allows numeric answer', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addNumericProblem`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeNumericProblem(),
      answer: faker.lorem.word(),
    })
    .expect(400);
});

it('can`t add a question to a published quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, true));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addNumericProblem`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeNumericProblem(),
    })
    .expect(404);
});