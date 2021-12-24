import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface MCQAnswerAttrs {
  answer: number,
};

// This interface defines the properties that a Student document contains
export interface MCQAnswerDoc extends mongoose.Document {
  answer: number,
};

// An interface for the model used to describe the methods we want to add on it
export interface MCQModel extends mongoose.Model<MCQAnswerDoc> {
  build(attrs: MCQAnswerAttrs): MCQAnswerDoc;
}

const MCQAnswerSchema = new mongoose.Schema<MCQAnswerDoc, MCQModel>({
  answer: {
    type: Number,
    required: true,
  }
});

export { MCQAnswerSchema };