import mongoose from 'mongoose';
import { TeacherAttrs, TeacherDoc, TeacherModel } from './teacher.types';
import { Password } from '../../../common/lib/Password';

const TeacherSchema = new mongoose.Schema<TeacherDoc>({
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

TeacherSchema.statics.build = (attrs: TeacherAttrs) => {
  return new Teacher(attrs);
};

TeacherSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hash = await Password.toHash(this.get('password'));
    this.set('password', hash);
  }

  done();
});

const Teacher = mongoose.model<TeacherDoc, TeacherModel>('Teacher', TeacherSchema);

export default Teacher;