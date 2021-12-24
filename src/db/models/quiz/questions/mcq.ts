import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface MCQAttrs {
  body: string,
  options: string[],
  answer: number,
};

// This interface defines the properties that a Student document contains
export interface MCQDoc extends mongoose.Document {
  body: string,
  options: string[],
  answer: number,
};

// An interface for the model used to describe the methods we want to add on it
export interface MCQModel extends mongoose.Model<MCQDoc> {
  build(attrs: MCQAttrs): MCQDoc;
}

const MCQSchema = new mongoose.Schema<MCQDoc, MCQModel>({
  body: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate(v: string[]) {
      return v.length === 4;
    },
  },
  answer: {
    type: Number,
    required: true,
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  }
});

export { MCQSchema };