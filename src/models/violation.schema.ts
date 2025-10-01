import mongoose, { Schema, Document } from 'mongoose';

export interface IViolation extends Document {
  title: string;
  description: string;
  photoUrl?: string;
  date: Date;
  latitude?: number;
  longitude?: number;
  userId: mongoose.Types.ObjectId;
}

const violationSchema = new Schema<IViolation>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String },
  date: { type: Date, default: Date.now },
  latitude: { type: Number },
  longitude: { type: Number },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IViolation>('Violation', violationSchema);
