import { FindOneAndUpdateOptions, ObjectId } from 'mongodb';
import { Document, Schema, Model, model, UpdateQuery } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import { validateEmail } from '../utils/validators';


export interface IUser extends Document {
  _id?: ObjectId,
  email: string,
  username: string,
  password: string,
  memberSince?: Date,
  accessLevel: number
};

interface IUserMethods {
  comparePasswords(pwd: string): Promise<Boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export const UserSchema: Schema<IUser, UserModel, IUserMethods> = new Schema({
  email: { type: String, required: true, unique: true, validate: [validateEmail, 'Email address is not valid'] },
  username: { type: String, required: true, unique: true, minlength: 4, maxlength: 15 },
  password: { type: String, required: true, },
  accessLevel: { type: Number, required: true },
  memberSince: { type: Date },
});

UserSchema.pre('findOneAndUpdate', function (this: UpdateQuery<IUser>, next: any) {
  const fieldsToUpdate = this.getUpdate();
  if (fieldsToUpdate.password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(fieldsToUpdate.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        fieldsToUpdate.password = hash;
        return next();
      })
    })
  } else {
    return next();
  }
});

UserSchema.pre('save', function (this: IUser, next: any) {
  const user = this;

  // Setting memberSince
  if (!user.memberSince) {
    user.memberSince = new Date();
  }

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

UserSchema.method('comparePasswords',
  function comparePasswords(pwd: string) {
    return bcrypt.compare(pwd, this.password);
  }
)

// Turns 'E11000' MongoDB error (unique already taken) into validationError
UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
