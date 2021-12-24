import mongoose from 'mongoose';
import { SubmissionAttrs, SubmissionDoc, SubmissionModel } from './submission.types';

const SubmissionSchema = new mongoose.Schema<SubmissionDoc>({
  studentId: {
    type: String,
    required: true,
  },
  quizId: {
    type: String,
    required: true,
  },
  answers: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  }
});

SubmissionSchema.statics.build = (attrs: SubmissionAttrs) => {
  return new Submission(attrs);
};

const Submission = mongoose.model<SubmissionDoc, SubmissionModel>('Submission', SubmissionSchema);

export default Submission;