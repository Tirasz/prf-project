import { ObjectId } from 'mongodb';
import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";


export interface UserModel extends Document {
  _id?: ObjectId,
  email: string,
  username: string,
  password: string,
  memberSince?: Date,
}

export const UserSchema: Schema<UserModel> = new Schema({
  _id: Schema.Types.ObjectId, // this might get generated automatically?
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  memberSince: { type: Date },
});

UserSchema.pre('save', function (this: UserModel, next: any) {
  const user = this;
  // Hashing password
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        return next();
      })
    })
  }
})

UserSchema.methods.comparePasswords = function (this: UserModel, password: string, next: any) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    next(err, isMatch);
  });
}

const User: Model<UserModel> = model<UserModel>('User', UserSchema);

export default User;
