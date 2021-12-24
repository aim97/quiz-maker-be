import request from 'supertest';

import { app } from '../../../app';
import { db } from '../../../db';
import { getFakeQuiz } from '../../../test/fakes/quiz';
import { getFakeSubmission } from '../../../test/fakes/submission';

it('can retrieve a quiz with answers', async () => {
  // get fake teacher
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies({ 
    email: teacher.email,
    password: teacher.password
  });

  // create a quiz'
  const quiz = await db.quiz.build(getFakeQuiz(teacher.id)).save();
  // generate a random number of submissions for this quiz
  const count = Math.floor(Math.random() * 10);
  // create submissions
  const submissions = [];
  for (let i = 0; i < count; i++) {
    const submission = getFakeSubmission(quiz.id);
    submissions.push(await db.submission.build(submission).save());
  }

  // retrieve the quiz with answers
  const response = await request(app)
    .get(`/quizmaker/quizes/${quiz.id}`)
    .set('Cookie', teacherAccessCookies);

  expect(response.status).toBe(200);
  expect(response.body.quiz.id).toBe(quiz.id);
  expect(response.body.submissions.length).toBe(submissions.length);
});

it('only a teacher can access this route', async () => {
  // get fake teacher
  const teacher = await global.newTeacher();

  // get fake student
  const student = await global.newStudent();
  const studentAccessCookies = await global.getStudentAccessCookies({
    email: student.email,
    password: student.password
  });

  // create a quiz'
  const quiz = await db.quiz.build(getFakeQuiz(teacher.id)).save();
  // generate a random number of submissions for this quiz
  const count = Math.floor(Math.random() * 10);
  // create submissions
  const submissions = [];
  for (let i = 0; i < count; i++) {
    const submission = getFakeSubmission(quiz.id);
    submissions.push(await db.submission.build(submission).save());
  }

  // retrieve the quiz with answers
  await request(app)
    .get(`/quizmaker/quizes/${quiz.id}`)
    .set('Cookie', studentAccessCookies)
    .expect(401);
});

it('only owner teacher can access his exam and see the submissions on it', async () => {
  // get fake teacher
  const teacher = await global.newTeacher();
  // get another teacher
  const anotherTeacher = await global.newTeacher();
  const anotherTeacherAccessCookies = await global.getTeacherAccessCookies({
    email: anotherTeacher.email,
    password: anotherTeacher.password
  });

  // create a quiz'
  const quiz = await db.quiz.build(getFakeQuiz(teacher.id)).save();
  // generate a random number of submissions for this quiz
  const count = Math.floor(Math.random() * 10);
  // create submissions
  const submissions = [];
  for (let i = 0; i < count; i++) {
    const submission = getFakeSubmission(quiz.id);
    submissions.push(await db.submission.build(submission).save());
  }

  // retrieve the quiz with answers
  await request(app)
    .get(`/quizmaker/quizes/${quiz.id}`)
    .set('Cookie', anotherTeacherAccessCookies)
    .expect(404);
});
