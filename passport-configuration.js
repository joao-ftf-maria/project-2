'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');


passport.use(
  'local-sign-up',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const name = req.body.name;
      const role = req.body.role;

      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            name,
            email,
            role,
            passwordHash: hash
          });
        })
        .then(user => {
          if (user) 
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  'local-sign-in',
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
    let user;
    User.findOne({
      email
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error('The password is incorrect'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});
