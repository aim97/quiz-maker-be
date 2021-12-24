import Student from '../student';
import faker from 'faker';

const getFakeStudent = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

it('Can create a Student', async () => {
  const student = new Student(getFakeStudent());

  await student.save();

  expect(student.__v).toBeDefined();
});

it('Has a build function that can be used to create a Student', async () => {
  const student = Student.build(getFakeStudent());

  await student.save();

  expect(student.__v).toBeDefined();
});