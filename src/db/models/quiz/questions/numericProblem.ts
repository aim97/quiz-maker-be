import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface NumericProblemAttrs {
  body: string
  answer: number,
};

// This interface defines the properties that a Student document contains
export interface NumericProblemDoc extends mongoose.Document {
  body: string,
  answer: number,
};

// An interface for the model used to describe the methods we want to add on it
export interface NumericProblemModel extends mongoose.Model<NumericProblemDoc> {
  build(attrs: NumericProblemAttrs): NumericProblemDoc;
}

const NumericProblemSchema = new mongoose.Schema<NumericProblemDoc, NumericProblemModel>({
  id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId.generate().toString('hex'),
  },
  body: {
    type: String,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  }
});

export { NumericProblemSchema };