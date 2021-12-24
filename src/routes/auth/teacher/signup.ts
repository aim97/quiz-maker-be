import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { db } from '../../../db';

import { validationHandler } from '../../../common/middlewares/validation-handler';

const router = Router();

const checks = [
  body('email')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 5, max: 20 })
    .withMessage('Password must between 5 and 20 characters long'),
];

router.post(
  '/auth/teacher/new',
  checks,
  validationHandler,  
  async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = db.teacher.build({
      email,
      password,
    });
    await user.save();
    res.status(201).send(user);
  }
);

export { router as teacherSignupRouter };
