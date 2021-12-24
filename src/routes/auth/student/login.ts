import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';

import { db } from '../../../db';

import { validationHandler } from '../../../common/middlewares/validation-handler';
import { AuthenticationError } from '../../../common/errors/AuthenticationError';
import { Password } from '../../../common/lib/Password';
import { Token } from '../../../common/lib/Token';

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
  '/auth/student/login',
  checks,
  validationHandler,
  async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = await db.student.findOne({ email });

    if (!user) {
      throw new AuthenticationError();
    }

    const isValid = await Password.compare(password, user.password);

    if (!isValid) {
      throw new AuthenticationError();
    }

    const token = Token.generateToken({ id: user.id, email: user.email, role: 'student' });

    req.session = { jwt: token }; 

    res.status(httpStatus.OK).send(user);
  },
);

export { router as studentLoginRouter };  