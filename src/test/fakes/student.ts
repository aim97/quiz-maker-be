import faker from 'faker';

export const getFakeStudent = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})