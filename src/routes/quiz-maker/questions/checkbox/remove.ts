import { Router, Request, Response } from 'express';
import { db } from '../../../../db';

import { NotFoundError } from '../../../../common/errors/NotFoundError';
const router: Router = Router();

router.delete(
  '/quiz-maker/:quizId/questions/checkboxes/:questionId/remove',
  async (req:Request, res:Response) => {
    const { quizId, questionId } = req.params;
    const quiz = await db.quiz.findOneAndUpdate({ 
      _id:quizId,
      ownerId: req.currentUser!.id,
      state: false,
      'checkBoxQuestions._id': questionId
    }, {
      $pull: { checkBoxQuestions: { _id: questionId } }
    }, {
      returnOriginal: false,
    });

    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }
    res.status(200).send(quiz);
  }
);

export { router as removeCheckBoxQuestionRouter };