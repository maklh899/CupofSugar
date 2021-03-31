const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const getSignedToken = require('../util/signedToken');

async function createUser(payload) {
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error('User already exist');
      }
      return bcrypt
        .hash(payload.password, 10)
        .then((hashed) => {
          const newUser = new User({
            email: payload.email,
            password: hashed,
            firstName: payload.firstName,
            lastName: payload.lastName,
            userName: payload.userName,
          });
          return newUser.save();
        })
        .catch((err) => {
          throw new Error('All field required');
        });
    });
}

function signInUser(payload) {
  // console.log('payload:', payload);
  console.log('userService-signInUser() payload:', payload);
  return User.findOne({ userName: payload.userName })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('Please enter email or password');
      } else {
        return bcrypt
          .compare(payload.password, user.password)
          .then((res) => {
            if (res) {
              const token = getSignedToken(user._id);
              return token;
            }
            throw new Error('Incorrect password or email, try again');
          })
          .catch((err) => {
            throw new Error('All field required');
          });
      }
    });
}

async function getUsers(payload) {
  return User.find()
    .then((users) => {
      payload.json(users);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
// const userServices = {
//     createUser,
//     signInUser,
// };
module.exports = { createUser, signInUser, getUsers };
