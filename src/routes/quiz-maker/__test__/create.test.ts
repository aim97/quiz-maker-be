/**
 * pre conditions
 * 1. The teacher must be logged in.
 * 
 * post conditions:
 * 1. the quiz is created
 * 2. the number of quizes of this owner increased by one
 */

import request from 'supertest';
import { app } from '../../../app';
import { db } from '../../../db';

it('allows the user to create an empty quiz', async () => {
  const teacher = await global.newTeacher();
  const teacherAccessCookies = await global.getTeacherAccessCookies(teacher);

  const myQuizesBefore = await db.quiz.find({ownerId: teacher.id}).count();

  await request(app).post('/quiz-maker/')
    .send()
    .set('Cookie', teacherAccessCookies)
    .expect(201);
  
  const myQuizesAfter = await db.quiz.find({ownerId: teacher.id}).count();

  expect(myQuizesAfter).toEqual(myQuizesBefore + 1);
});

it('doesn`t allow a student or unathenticated user to create a quiz', async () => {
  // student
  const student = await global.newStudent();
  const studentAccessCookies = await global.getStudentAccessCookies(student);

  await request(app).post('/quiz-maker/')
    .send()
    .set('Cookie', studentAccessCookies)
    .expect(401);

  // unauthenticated user
  await request(app).post('/quiz-maker/')
    .send()
    .expect(401);
});
