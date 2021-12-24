/**
 * get certain quiz
 * 
 * /navigator/quizes/:id
 * 
 * allowed access: all
 * 
 */

 import { Router } from 'express';

 import { db } from '../../db';

 import { NotFoundError } from '../../common/errors/NotFoundError';
 
 const router = Router();
 
 router.get(
  '/navigator/quizes/:id', 
  async (req, res) => {
    const quiz = await db.quiz.findById(req.params.id);
    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }
    res.status(200).send(quiz);
 },
);
 
 export { router as getQuizRouter };