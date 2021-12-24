import faker from 'faker';
import mongoose from 'mongoose';

export const getFakeMCQ = () => ({
  id: mongoose.Types.ObjectId.generate().toString('hex'),
  body: faker.lorem.sentence(),
  options: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  answer: Math.floor(Math.random() * 4),
});

export const getFakeEssayProblem = () => ({
  id: mongoose.Types.ObjectId.generate().toString('hex'),
  body: faker.lorem.sentence(),
  answer: faker.lorem.word(),
});

export const getFakeCheckBoxes = () => ({
  id: mongoose.Types.ObjectId.generate().toString('hex'),
  body: faker.lorem.sentence(),
  options: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  answer: [
    faker.datatype.boolean(),
    faker.datatype.boolean(),
    faker.datatype.boolean(),
    faker.datatype.boolean(),
  ]
});

export const getFakeNumericProblem = () => ({
  id: mongoose.Types.ObjectId.generate().toString('hex'),
  body: faker.lorem.sentence(),
  answer: faker.datatype.number(),
});

export const getFakeQuestion = () => {
  const qTypes = [getFakeMCQ, getFakeEssayProblem, getFakeCheckBoxes, getFakeNumericProblem];
  const qType = qTypes[Math.floor(Math.random() * qTypes.length)];
  return qType();
};

export const getFakeQuizWithQuestions = () => {
  const count = Math.floor(Math.random() * 10);
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(getFakeQuestion());
  }
  return questions;
}

export const getFakeQuiz = (
  ownerId=mongoose.Types.ObjectId.generate().toString("hex"), 
  state=faker.datatype.boolean()) => 
({
  ownerId,
  state,
  questions: getFakeQuizWithQuestions(),
});
