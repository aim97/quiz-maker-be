import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface CheckBoxesAttrs {
  body: string,
  options: string[],
  answer: boolean[],
};

// This interface defines the properties that a Student document contains
export interface CheckBoxesDoc extends mongoose.Document {
  body: string,
  options: string[],
  answer: boolean[],
};

// An interface for the model used to describe the methods we want to add on it
export interface CheckBoxesModel extends mongoose.Model<CheckBoxesDoc> {
  build(attrs: CheckBoxesAttrs): CheckBoxesDoc;
}

const CheckBoxesSchema = new mongoose.Schema<CheckBoxesDoc, CheckBoxesModel>({
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
    type: [Boolean],
    required: true,
    validate(v: string[]) {
      return v.length === 4;
    },
  }
});

export { CheckBoxesSchema };