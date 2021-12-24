import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface CheckBoxesAnswerAttrs {
  answer: boolean[],
};

// This interface defines the properties that a Student document contains
export interface CheckBoxesAnswerDoc extends mongoose.Document {
  answer: boolean[],
};

// An interface for the model used to describe the methods we want to add on it
export interface CheckBoxesAnswerModel extends mongoose.Model<CheckBoxesAnswerDoc> {
  build(attrs: CheckBoxesAnswerAttrs): CheckBoxesAnswerDoc;
}

const CheckBoxesAnswerSchema = new mongoose.Schema<CheckBoxesAnswerDoc, CheckBoxesAnswerModel>({
  answer: {
    type: [Boolean],
    required: true,
    validate(v: string[]) {
      return v.length === 4;
    },
  }
});

export { CheckBoxesAnswerSchema };