import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Student
export interface StudentAttrs {
  email: string;
  password: string;
};

// This interface defines the properties that a Student document contains
export interface StudentDoc extends mongoose.Document {
  email: string;
  password: string;
};

// An interface for the model used to describe the methods we want to add on it
export interface StudentModel extends mongoose.Model<StudentDoc> {
  build(attrs: StudentAttrs): StudentDoc;
}
