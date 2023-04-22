import User from '../models/User';
import Torrent from '../models/Torrent';
import { ObjectId } from 'mongodb';
import { generateName } from './generators';

const AdminUser = new User({
  email: "admin@admin.com",
  username: "admin",
  password: 'admin123',
  accessLevel: 3,
  memberSince: new Date()
})

const TestUser = new User({
  email: "test@test.com",
  username: "test_elek",
  password: 'test123',
  accessLevel: 1,
  memberSince: new Date()
})


function generateTorrent(ownerId: ObjectId) {
  return new Torrent({
    owner: ownerId,
    title: generateName(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis ultrices orci, ac feugiat lectus aliquet sed. Integer condimentum purus vitae condimentum commodo. Nam non purus pellentesque, vehicula magna eu, mollis est. Vestibulum non vehicula erat, sit amet ornare lacus. Sed rutrum, sem ut eleifend sodales, mauris enim ullamcorper nulla, pretium rutrum ante felis vitae dui."
  });
}

function bootstrapTorrent(owner: ObjectId) {
  Torrent.findOne({ owner: owner })
    .then(adminTorrent => {
      if (adminTorrent) {
        console.log('There is already a torrent for this user');
        return;
      }
      generateTorrent(owner).save()
        .then(torrent => {
          console.log('Torrent for user bootstrapped')
        })
    })
    .catch(err => {
      console.error("Error while bootstrapping Torrent for user!")
      console.error(err);
    })
}

function bootstrapAdminUser() {
  User.findOne({ email: AdminUser.email })
    .then(adminUser => {
      if (adminUser) {
        console.log('There is already an admin user!');
        console.log('Bootstrapping torrent for admin user')
        bootstrapTorrent(adminUser._id);
        return
      }

      AdminUser.save().then((user) => {
        console.log("New admin bootstrapped");
        console.log('Bootstrapping torrent for admin user')
        bootstrapTorrent(user._id);
      });

    })
    .catch(err => {
      console.error("Error while bootstrapping admin user!")
      console.error(err);
    })
}

function bootstrapTestUser() {

  User.findOne({ email: TestUser.email })
    .then(testUser => {
      if (testUser) {
        console.log('There is already a test user!');
        console.log('Bootstrapping torrent for test user')
        bootstrapTorrent(testUser._id);
        return
      };

      TestUser.save().then((user) => {
        console.log("New test user bootstrapped");
        console.log('Bootstrapping torrent for test user')
        bootstrapTorrent(user._id);
      });
    })
    .catch(err => {
      console.error("Error while bootstrapping test user!")
      console.error(err);
    })
}

export default function bootstrapDatabase() {
  bootstrapAdminUser();
  bootstrapTestUser();
}