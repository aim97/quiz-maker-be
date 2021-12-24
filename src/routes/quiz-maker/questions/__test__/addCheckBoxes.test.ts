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

import { getFakeQuiz, getFakeCheckBoxes } from '../../../../test/fakes/quiz';

it('allows the quiz owner to add a questions to an existing quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  const questionsCount = quiz.questions.length;
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', teacherAccessCookies)
    .send(getFakeCheckBoxes())
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
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', anotherTeacherAccessCookies)
    .send(getFakeCheckBoxes())
    .expect(404);
});

it('doesn`t allow a student to add questions', async () => {
  const teacher = await global.newStudent();
  const student = await global.newStudent();
  const studentAccessCookies = await global.getStudentAccessCookies(student);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', studentAccessCookies)
    .send(getFakeCheckBoxes())
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
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeCheckBoxes(),
      options: options1,
    })
    .expect(400);

  const options2:string[] = [];
  for (let i = 0; i < wrongAnswers[1]; i++) {
    options1.push(faker.lorem.word());
  }

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeCheckBoxes(),
      options: options2,
    })
    .expect(400);
});

it('only allows 4 answers (1 per checkbox)', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, false));
  await quiz.save();

  // generate 2 numbers one less than 4 and the other greater than 4
  const wrongAnswers = [faker.datatype.number({ min: 1, max: 3 }), faker.datatype.number({ min: 5, max: 10 })];
  // generate few options with first number
  const answer1:boolean[] = [];
  for (let i = 0; i < wrongAnswers[0]; i++) {
    answer1.push(faker.datatype.boolean());
  }

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeCheckBoxes(),
      answer: answer1,
    })
    .expect(400);

    const answer2:boolean[] = [];
    for (let i = 0; i < wrongAnswers[1]; i++) {
      answer2.push(faker.datatype.boolean());
    }

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeCheckBoxes(),
      answer: answer2,
    })
    .expect(400);
});

it('can`t add a question to a published quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const quiz = db.quiz.build(getFakeQuiz(teacher.id, true));
  await quiz.save();

  await request(app)
    .post(`/quiz-maker/${quiz.id}/questions/addcheckboxes`)
    .set('Cookie', teacherAccessCookies)
    .send({
      ...getFakeCheckBoxes(),
    })
    .expect(404);
});