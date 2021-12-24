import mongoose from 'mongoose';
import { QuizAttrs, QuizDoc, QuizModel } from './quiz.types';
import { MCQSchema } from './questions/mcq';
import { CheckBoxesSchema } from './questions/checkBoxes';
import { EssayProblemSchema } from './questions/essayProblem';
import { NumericProblemSchema } from './questions/numericProblem';

const QuizSchema = new mongoose.Schema<QuizDoc>({
  ownerId: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
  MCQs: {
    type: [MCQSchema],
    required: true,
  },
  checkBoxQuestions: {
    type: [CheckBoxesSchema],
    required: true,
  },
  essayProblems: {
    type: [EssayProblemSchema],
    required: true,
  },
  numericProblems: {
    type: [NumericProblemSchema],
    required: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  }
});

QuizSchema.statics.build = (attrs: QuizAttrs) => {
  return new Quiz(attrs);
};

const Quiz = mongoose.model<QuizDoc, QuizModel>('Quiz', QuizSchema);

export default Quiz;