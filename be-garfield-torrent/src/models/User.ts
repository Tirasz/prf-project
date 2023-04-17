import { ObjectId } from 'mongodb';
import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";


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
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessLevel: { type: Number, required: true },
  memberSince: { type: Date },
});

UserSchema.pre('save', function (this: IUser, next: any) {
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

UserSchema.method('comparePasswords',
  function comparePasswords(pwd: string) {
    return bcrypt.compare(pwd, this.password);
  }
)

const User = model<IUser, UserModel>('User', UserSchema);

function bootstrapAdmin() {
  User.findOne({ accessLevel: 3 })
    .then(adminUser => {
      if (adminUser) {
        console.log('There is already an admin user!');
        return
      };

      new User({
        email: "admin@admin.com",
        username: "admin",
        password: 'admin123',
        accessLevel: 3,
        memberSince: new Date()
      }).save().then(() => { console.log("New admin bootstrapped") });
    })
    .catch(err => {
      console.error("Error while bootstrapping admin user!")
      console.error(err);
    })
}

function bootstrapTestUser() {
  User.findOne({ username: 'test_elek' })
    .then(testUser => {
      if (testUser) {
        console.log('There is already a test user!');
        return
      };

      new User({
        email: "test@test.com",
        username: "test_elek",
        password: 'test123',
        accessLevel: 1,
        memberSince: new Date()
      }).save().then(() => { console.log("New test user bootstrapped") });
    })
    .catch(err => {
      console.error("Error while bootstrapping test user!")
      console.error(err);
    })
}

export function bootstrapUsers() {
  bootstrapAdmin();
  bootstrapTestUser();
}

export default User;
