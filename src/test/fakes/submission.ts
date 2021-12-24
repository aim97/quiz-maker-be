import faker from 'faker';
import mongoose from 'mongoose';

export const getFakeMCQAnswer = () => ({
  answer: Math.floor(Math.random() * 4),
});

export const getFakeEssayAnswer = () => ({
  answer: faker.lorem.word(),
});

export const getFakeCheckBoxesAnswer = () => ({
  answer: [
    faker.datatype.boolean(),
    faker.datatype.boolean(),
    faker.datatype.boolean(),
    faker.datatype.boolean(),
  ]
});

export const getFakeNumericAnswer = () => ({
  answer: faker.datatype.number(),
});

export const getFakeAnswers = () => {
  const qTypes = [getFakeMCQAnswer, getFakeEssayAnswer, getFakeCheckBoxesAnswer, getFakeNumericAnswer];
  const qType = qTypes[Math.floor(Math.random() * qTypes.length)];
  return qType();
};

export const getFakeQuizWithQuestions = () => {
  const count = Math.floor(Math.random() * 10);
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(getFakeAnswers());
  }
  return questions;
}

export const getFakeSubmission = (
    quizId= mongoose.Types.ObjectId.generate().toString("hex"),
    studentId=mongoose.Types.ObjectId.generate().toString("hex"),
  ) => ({
  studentId,
  quizId,
  answers: getFakeQuizWithQuestions(),
});