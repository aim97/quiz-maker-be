import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { db } from '../../../../db';

import { validationHandler } from '../../../../common/middlewares/validation-handler';
import { onlyTeachers } from '../../../../common/middlewares/only-teacher';
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
  body('options')
    .exists()
    .withMessage('Options are required')
    .isArray()
    .withMessage('Options must be an array')
    .custom((v: string[]) => v.length === 4)
    .withMessage('Options must contain 4 options')
    .custom((v: string[]) => v.every(option => typeof option === 'string'))
    .withMessage('Options must be strings')
  ,
  body('answer')
    .exists()
    .withMessage('Answer is required')
    .isInt({ min: 0, max: 3 })
    .withMessage('Answer must be between 0 and 3')
];

router.post(
  '/quiz-maker/:quizId/questions/mcq/add',
  onlyTeachers,
  checks,
  validationHandler,
  async (req:Request, res:Response) => {
    const { quizId } = req.params;
    const { body, options, answer } = req.body;
    const question = {
      body,
      options,
      answer,
    };
    
    const quiz = await db.quiz.findOneAndUpdate({ 
      _id:quizId,
      ownerId: req.currentUser!.id,
      state: false,
    }, { 
      $push: { MCQs: question } 
    }, {
      returnOriginal: false,
    });

    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }
    res.status(201).send(quiz);
  }

)

export { router as addMCQRouter };