import faker from 'faker';

export const getFakeTeacher = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})