import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface EssayProblemAttrs {
  body: string,
  answer: string,
};

// This interface defines the properties that a Student document contains
export interface EssayProblemDoc extends mongoose.Document {
  body: string,
  answer: string,
};

// An interface for the model used to describe the methods we want to add on it
export interface EssayProblemModel extends mongoose.Model<EssayProblemDoc> {
  build(attrs: EssayProblemAttrs): EssayProblemDoc;
}

const EssayProblemSchema = new mongoose.Schema<EssayProblemDoc, EssayProblemModel>({
  body: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
});

export { EssayProblemSchema };