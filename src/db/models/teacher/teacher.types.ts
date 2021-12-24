import mongoose from 'mongoose';

// This interface defines the properties needed to create a new Teacher
export interface TeacherAttrs {
  email: string;
  password: string;
};

// This interface defines the properties that a Teacher document contains
export interface TeacherDoc extends mongoose.Document {
  email: string;
  password: string;
};

// An interface for the model used to describe the methods we want to add on it
export interface TeacherModel extends mongoose.Model<TeacherDoc> {
  build(attrs: TeacherAttrs): TeacherDoc;
}
