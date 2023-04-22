import { ObjectId, Schema, model } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

export interface ITorrent extends Document {
  _id?: ObjectId,
  owner: ObjectId,
  created?: Date,
  title: string,
  description: string
}


export const TorrentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true, unique: true, minlength: 4, maxlength: 40 },
  description: { type: String, required: true, },
  created: { type: Date },
});


TorrentSchema.pre('save', function (this: ITorrent, next: any) {
  const torrent = this;
  if (!torrent.created) {
    torrent.created = new Date();
  }
  return next();
});

// Turns 'E11000' MongoDB error (unique already taken) into validationError
TorrentSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });


const Torrent = model<ITorrent>('Torrent', TorrentSchema);

export default Torrent;