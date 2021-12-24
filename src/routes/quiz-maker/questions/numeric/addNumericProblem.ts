import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { db } from '../../../../db';

import { onlyTeachers } from '../../../../common/middlewares/only-teacher';
import { validationHandler } from '../../../../common/middlewares/validation-handler';
import { NotFoundError } from '../../../../common/errors/NotFoundError';
const router: Router = Router();

const checks = [
  body('body')
    .exists()
    .withMessage('Body is required')
    .isString()
    .withMessage('Body must be a string')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Body must be between 10 and 1000 characters')
  ,
  body('answer')
    .exists()
    .withMessage('Answer is required')
    .isNumeric()
    .withMessage('Answer must be a number')
];

router.post(
  '/quiz-maker/:quizId/questions/numeric/add',
  onlyTeachers,
  checks,
  validationHandler,
  async (req:Request, res:Response) => {
    const { quizId } = req.params;
    const { body, answer } = req.body;
    const question = {
      body,
      answer,
    };
    
    const quiz = await db.quiz.findOneAndUpdate({ 
      _id:quizId,
      ownerId: req.currentUser!.id,
      state: false,
    }, { 
      $push: { numericProblems: question } 
    }, {
      returnOriginal: false,
    });

    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }
    res.status(201).send(quiz);
  }

)

export { router as addNumericProblemRouter };