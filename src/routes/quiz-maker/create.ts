import { Router, Request, Response } from 'express';

import { db } from '../../db';

import { onlyTeachers } from '../../common/middlewares/only-teacher';

const router: Router = Router();  

router.post(
  '/quiz-maker',
  onlyTeachers,
  async (req: Request, res: Response) => {
    const { id } = req.currentUser!;
    const quizModel = db.quiz.build({ ownerId:id, state: false});
    await quizModel.save();
    res.status(201).send(quizModel);
  }
)

export { router as createQuizRouter };