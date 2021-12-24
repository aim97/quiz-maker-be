import mongoose from 'mongoose';
import { MCQAnswerDoc, MCQAnswerAttrs } from './answers/mcq';4
import { EssayAnswerDoc, EssayAnswerAttrs } from './answers/essayAnswer';
import { CheckBoxesAnswerDoc, CheckBoxesAnswerAttrs } from './answers/checkBoxes';
import { NumericAnswerDoc, NumericAnswerAttrs } from './answers/numericAnswer';



// This interface defines the properties needed to create a new Submission
export interface SubmissionAttrs {
  studentId: string,
  quizId: string,
  answers: (MCQAnswerAttrs|CheckBoxesAnswerAttrs|EssayAnswerAttrs|NumericAnswerAttrs)[]
};

// This interface defines the properties that a Submission document contains
export interface SubmissionDoc extends mongoose.Document {
  studentId: string,
  quizId: string,
  answers: (MCQAnswerDoc|CheckBoxesAnswerDoc|EssayAnswerDoc|NumericAnswerDoc)[]
};

// An interface for the model used to describe the methods we want to add on it
export interface SubmissionModel extends mongoose.Model<SubmissionDoc> {
  build(attrs: SubmissionAttrs): SubmissionDoc;
}
