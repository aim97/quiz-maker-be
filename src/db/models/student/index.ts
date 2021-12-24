import mongoose from 'mongoose';
import { StudentAttrs, StudentDoc, StudentModel } from './student.types';
import { Password } from '../../../common/lib/Password';

const StudentSchema = new mongoose.Schema<StudentDoc>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false,
  }
});

StudentSchema.statics.build = (attrs: StudentAttrs) => {
  return new Student(attrs);
};

StudentSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hash = await Password.toHash(this.get('password'));
    this.set('password', hash);
  }

  done();
});

const Student = mongoose.model<StudentDoc, StudentModel>('Student', StudentSchema);

export default Student;