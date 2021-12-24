import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import faker from 'faker';

// import { TeacherDoc } from '../db/models/teacher/teacher.types';
// import { StudentDoc } from '../db/models/student/student.types';

import { app } from '../app';
import { getFakeStudent } from './fakes/student';
import { getFakeTeacher } from './fakes/teacher';

interface User {
  id: string;
  email: string;
  password: string;
};

interface Credentials {
  email: string;
  password: string;
};

declare global {
  function getTeacherAccessCookies(user:Credentials): Promise<string[]>;
  function newTeacher(): Promise<User>;
  function getStudentAccessCookies(user:Credentials): Promise<string[]>;
  function newStudent(): Promise<User>;
};

global.getTeacherAccessCookies = async (user:Credentials) => {
  const response = await request(app).post('/auth/teacher/login').send(user).expect(200);
  return response.get('Set-Cookie');
}

global.newTeacher = async () => {
  const teacher = getFakeTeacher();
  const response = await request(app).post('/auth/teacher/new').send(teacher).expect(201);
  return { id: response.body.id, ...teacher };
}

global.getStudentAccessCookies = async (user:Credentials) => {
  const response = await request(app).post('/auth/student/login').send(user).expect(200);
  return response.get('Set-Cookie');
}

global.newStudent = async () => {
  const student = getFakeStudent();
  const response = await request(app).post('/auth/student/new').send(student).expect(201);
  return { id: response.body.id, ...student };
}

// before all
// 1. initialize env variables for testing
// 2. start mongoose connection to mongodb-memory-server
let memdb: MongoMemoryServer;
beforeAll(async () => {
  memdb = await MongoMemoryServer.create();
  
  process.env.MONGO_URI = memdb.getUri();
  process.env.JWT_KEY = faker.internet.password();
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  await mongoose.connect(process.env.MONGO_URI);
});

// before each suite
// 1. clear collections
beforeEach(async () => {
  const cols = await mongoose.connection.db.collections();
  cols.forEach(async (col) => {
    await col.deleteMany({});
  })
});

// after all
// close connection
afterAll(async () => {
  await mongoose.disconnect()
  await memdb.stop();
})