import mongoose from 'mongoose';
import { MCQDoc, MCQAttrs } from './questions/mcq';4
import { EssayProblemDoc, EssayProblemAttrs } from './questions/essayProblem';
import { CheckBoxesDoc, CheckBoxesAttrs } from './questions/checkBoxes';
import { NumericProblemDoc, NumericProblemAttrs } from './questions/numericProblem';



// This interface defines the properties needed to create a new Quiz
export interface QuizAttrs {
  ownerId: string,
  state: boolean,
  MCQs: MCQAttrs[],
  checkBoxQuestions: CheckBoxesAttrs[],
  essayProblems: EssayProblemAttrs[],
  numericProblems: NumericProblemAttrs[],
};

// This interface defines the properties that a Quiz document contains
export interface QuizDoc extends mongoose.Document {
  ownerId: string,
  state: boolean,
  MCQs: MCQDoc[],
  checkBoxQuestions: CheckBoxesDoc[],
  essayProblems: EssayProblemDoc[],
  numericProblems: NumericProblemDoc[],
};

// An interface for the model used to describe the methods we want to add on it
export interface QuizModel extends mongoose.Model<QuizDoc> {
  build(attrs: QuizAttrs): QuizDoc;
}
