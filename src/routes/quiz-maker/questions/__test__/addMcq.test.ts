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

it('allows the quiz owner to add a questions to an existing quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  const questionsCount = quiz.questions.length;
  await quiz.save();

  const response = await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', teacherAccessCookies)
    .send(getFakeMCQ())
    .expect(201);

  const q = await db.quiz.findById(quiz.id);
  expect(q).not.toBeNull()
  expect(q!.questions.length).toEqual(questionsCount + 1);

  expect(response.body.questions.length).toEqual(questionsCount + 1);
});

//! authentication tests
it('allows only allows owner teacher to add a question', async () => {
  const teacher = await global.newTeacher();
  const anotherTeacher = await global.newTeacher();
  const anotherTeacherAccessCookies = await global.getTeacherAccessCookies(anotherTeacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', anotherTeacherAccessCookies)
    .send(getFakeMCQ())
    .expect(404);
});

it('doesn`t allow a student to add questions', async () => {
  const teacher = await global.newStudent();
  const student = await global.newStudent();
  const studentAccessCookies = await global.getStudentAccessCookies(student);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', studentAccessCookies)
    .send(getFakeMCQ())
    .expect(401);
});

//!validation tests
it('only allows 4 options', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  // generate 2 numbers one less than 4 and the other greater than 4
  const wrongAnswers = [faker.datatype.number({ min: 1, max: 3 }), faker.datatype.number({ min: 5, max: 10 })];
  // generate few options with first number
  const options1:string[] = [];
  for (let i = 0; i < wrongAnswers[0]; i++) {
    options1.push(faker.lorem.word());
  }

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeMCQ(),
      options: options1,
    })
    .expect(400);

  const options2:string[] = [];
  for (let i = 0; i < wrongAnswers[1]; i++) {
    options1.push(faker.lorem.word());
  }

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeMCQ(),
      options: options2,
    })
    .expect(400);
});

it('only allows numeric answer between 1 and 4', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeMCQ(),
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
    .post(`/quiz-maker/${quiz.id}/questions/addmcq`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeMCQ(),
    })
    .expect(404);
});