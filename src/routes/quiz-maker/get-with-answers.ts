/**
 * get certain quiz
 * 
 * /navigator/quizes/:id
 * 
 * allowed access: Teacher
 * 
 */

 import { Router } from 'express';

 import { db } from '../../db';

 import { NotFoundError } from '../../common/errors/NotFoundError';
 import { onlyTeachers } from '../../common/middlewares/only-teacher';
 
 const router = Router();
 
 router.get(
  '/quizmaker/quizes/:id',
  onlyTeachers,
  async (req, res) => {
    const quiz = (await db.quiz.find({ _id: req.params.id, ownerId: req.currentUser!.id }))[0];
    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }

    const submissions = await db.submission.find({ quizId: req.params.id });

    res.status(200).send({
      quiz,
      submissions,
    });
 },
);
 
 export { router as getQuizWithAnswersRouter };