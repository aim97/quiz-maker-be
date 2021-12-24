import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { db } from '../../../db';

import { onlyTeachers } from '../../../common/middlewares/only-teacher';
import { validationHandler } from '../../../common/middlewares/validation-handler';
import { NotFoundError } from '../../../common/errors/NotFoundError';
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
    .isArray()
    .withMessage('Answer must be an array')
    .custom((v: number[]) => v.length === 4)
    .withMessage('Answer must contain 4 options')
    .custom((v: number[]) => v.every(option => typeof option === 'boolean'))
    .withMessage('Answer must be booleans')
];

router.post(
  '/quiz-maker/:quizId/questions/addcheckboxes', 
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
      $push: { questions: question } 
    }, {
      returnNewDocument: true
    });

    if (!quiz) {
      throw new NotFoundError('Quiz not found');
    }

    res.status(201).send(quiz);
  }

)

export { router as addCheckBoxesProblemRouter };