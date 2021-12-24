import App from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserHandler } from './common/middlewares/current-user';
import { notFoundHandler } from './common/middlewares/not-found-handler';
import { errorHandler } from './common/middlewares/error-handler';

import { getAllQuizesRouter } from './routes/navigator';
import { getQuizRouter } from './routes/navigator/get';

import { teacherSignupRouter } from './routes/auth/teacher/signup';
import { teacherLoginRouter } from './routes/auth/teacher/login';
import { studentSignupRouter } from './routes/auth/student/signup';
import { studentLoginRouter } from './routes/auth/student/login';

import { getQuizWithAnswersRouter } from './routes/quiz-maker/get-with-answers'; 
import { createQuizRouter } from './routes/quiz-maker/create';

import { addMCQRouter } from './routes/quiz-maker/questions/addMcq';
import { addCheckBoxesProblemRouter } from './routes/quiz-maker/questions/addCheckBoxes';
import { addEssayProblemRouter } from './routes/quiz-maker/questions/addEssayProblem';
import { addNumericProblemRouter } from './routes/quiz-maker/questions/addNumericProblem';
import { removeQuestionRouter } from './routes/quiz-maker/questions/remove';

const app = App();

app.set('trust proxy', true); // trust ingress proxy (in dev env where we use a fake certificate)

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // only send cookies over https
  })
);
app.use(currentUserHandler);

app.use(getAllQuizesRouter);
app.use(getQuizRouter); 

app.use(teacherSignupRouter);
app.use(teacherLoginRouter);

app.use(studentSignupRouter);
app.use(studentLoginRouter);

app.use(getQuizWithAnswersRouter);
app.use(createQuizRouter);

app.use(addMCQRouter);
app.use(addCheckBoxesProblemRouter);
app.use(addEssayProblemRouter);
app.use(addNumericProblemRouter);

app.use(removeQuestionRouter);

app.all('*', notFoundHandler);

app.use(errorHandler);

export { app };