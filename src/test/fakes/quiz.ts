import faker from 'faker';
import mongoose from 'mongoose';

import { MCQAttrs } from '../../db/models/quiz/questions/mcq';
import { CheckBoxesAttrs } from '../../db/models/quiz/questions/checkBoxes';
import { EssayProblemAttrs } from '../../db/models/quiz/questions/essayProblem';
import { NumericProblemAttrs } from '../../db/models/quiz/questions/numericProblem';

export const getFakeMCQ = () => ({
  body: faker.lorem.sentence(),
  options: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  answer: Math.floor(Math.random() * 4),
});

export const getFakeEssayProblem = () => ({
  body: faker.lorem.sentence(),
  answer: faker.lorem.word(),
});

export const getFakeCheckBoxes = () => ({
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
  body: faker.lorem.sentence(),
  answer: faker.datatype.number(),
});

export const getFakeQuizWithQuestions = <T>(getFakeQuestion: () => T): T[] => {
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
  MCQs: getFakeQuizWithQuestions(getFakeMCQ),
  checkBoxQuestions: getFakeQuizWithQuestions(getFakeCheckBoxes),
  essayProblems: getFakeQuizWithQuestions(getFakeEssayProblem),
  numericProblems: getFakeQuizWithQuestions(getFakeNumericProblem),
});
