import mongoose from 'mongoose';
import { MCQDoc, MCQAttrs } from './questions/mcq';4
import { EssayProblemDoc, EssayProblemAttrs } from './questions/essayProblem';
import { CheckBoxesDoc, CheckBoxesAttrs } from './questions/checkBoxes';
import { NumericProblemDoc, NumericProblemAttrs } from './questions/numericProblem';



// This interface defines the properties needed to create a new Quiz
export interface QuizAttrs {
  ownerId: string,
  state: boolean,
  questions: (MCQAttrs|CheckBoxesAttrs|EssayProblemAttrs|NumericProblemAttrs)[]
};

// This interface defines the properties that a Quiz document contains
export interface QuizDoc extends mongoose.Document {
  ownerId: string,
  state: boolean,
  questions: (MCQDoc|CheckBoxesDoc|EssayProblemDoc|NumericProblemDoc)[]
};

// An interface for the model used to describe the methods we want to add on it
export interface QuizModel extends mongoose.Model<QuizDoc> {
  build(attrs: QuizAttrs): QuizDoc;
}
