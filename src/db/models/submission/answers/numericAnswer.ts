import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface NumericAnswerAttrs {
  answer: number,
};

// This interface defines the properties that a Student document contains
export interface NumericAnswerDoc extends mongoose.Document {
  answer: number,
};

// An interface for the model used to describe the methods we want to add on it
export interface NumericAnswerModel extends mongoose.Model<NumericAnswerDoc> {
  build(attrs: NumericAnswerAttrs): NumericAnswerDoc;
}

const NumericAnswerSchema = new mongoose.Schema<NumericAnswerDoc, NumericAnswerModel>({
  answer: {
    type: Number,
    required: true,
  }
});

export { NumericAnswerSchema };