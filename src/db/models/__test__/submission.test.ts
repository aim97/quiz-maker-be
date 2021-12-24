import Submission from '../submission';
import { getFakeSubmission } from '../../../test/fakes/submission';

it('Can create a quiz', async () => {
  const submission = new Submission(getFakeSubmission());

  await submission.save();
  expect(submission.__v).toBeDefined();
});

it('Has a build function that can be used to create a quiz', async () => {
  const submission = Submission.build(getFakeSubmission());

  await submission.save();

  expect(submission.__v).toBeDefined();
});