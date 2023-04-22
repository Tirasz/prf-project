import { ObjectId, Schema, UpdateQuery, model } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

export enum TorrentCategory {
  MOVIE = "MOVIE",
  SOFTWARE = "SOFTWARE",
  XXX = "XXX",
  EBOOK = "EBOOK"
}

export interface ITorrent extends Document {
  _id?: ObjectId,
  owner: ObjectId,
  created?: Date,
  title: string,
  description: string,
  category: TorrentCategory,
  seeders: number,
  leechers: number
}


export const TorrentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true, unique: true, minlength: 4, maxlength: 40 },
  description: { type: String, required: true, },
  created: { type: Date },
  category: { type: String, required: true, enum: TorrentCategory },
  seeders: { type: Number, required: true },
  leechers: { type: Number, required: true }
});


TorrentSchema.pre('save', function (this: ITorrent, next: any) {
  const torrent = this;
  if (!torrent.created) {
    torrent.created = new Date();
  }
  return next();
});

TorrentSchema.pre('findOneAndUpdate', function (this: UpdateQuery<ITorrent>, next: any) {
  const fieldsToUpdate = this.getUpdate();
  if (fieldsToUpdate.owner) {
    return next({ name: 'Bad request', message: 'Cannot change owner of torrents!' });
  }
  return next()
})

// Turns 'E11000' MongoDB error (unique already taken) into validationError
TorrentSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });


const Torrent = model<ITorrent>('Torrent', TorrentSchema);

export default Torrent;