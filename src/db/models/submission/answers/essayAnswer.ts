import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface EssayAnswerAttrs {
  answer: string,
};

// This interface defines the properties that a Student document contains
export interface EssayAnswerDoc extends mongoose.Document {
  answer: string,
};

// An interface for the model used to describe the methods we want to add on it
export interface EssayAnswerModel extends mongoose.Model<EssayAnswerDoc> {
  build(attrs: EssayAnswerAttrs): EssayAnswerDoc;
}

const EssayAnswerSchema = new mongoose.Schema<EssayAnswerDoc, EssayAnswerModel>({
  answer: {
    type: String,
    required: true,
  }
});

export { EssayAnswerSchema };