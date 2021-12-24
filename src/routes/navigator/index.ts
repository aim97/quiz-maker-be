/**
 * get all quizes
 * 
 * /navigator/quizes
 * 
 * allowed access: all
 * 
 */

import { Router } from 'express';

import { db } from '../../db';

const router = Router();

router.get('/navigator/quizes', 
 async (req, res) => {
  const quizes = await db.quiz.find({});
  res.status(200).send(quizes);
});

export { router as getAllQuizesRouter };