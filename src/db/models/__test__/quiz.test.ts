import Quiz from '../quiz';
import { getFakeQuiz } from '../../../test/fakes/quiz';


it('Can create a quiz', async () => {
  const quiz = new Quiz(getFakeQuiz());

  await quiz.save();
  expect(quiz.__v).toBeDefined();
});

it('Has a build function that can be used to create a quiz', async () => {
  const quiz = Quiz.build(getFakeQuiz());

  await quiz.save();

  expect(quiz.__v).toBeDefined();
});