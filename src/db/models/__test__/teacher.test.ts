import Teacher from '../teacher';
import faker from 'faker';

const getFakeTeacher = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

it('Can create a teacher', async () => {
  const teacher = new Teacher(getFakeTeacher());

  await teacher.save();

  expect(teacher.__v).toBeDefined();
});

it('Has a build function that can be used to create a Teacher', async () => {
  const teacher = Teacher.build(getFakeTeacher());

  await teacher.save();

  expect(teacher.__v).toBeDefined();
});