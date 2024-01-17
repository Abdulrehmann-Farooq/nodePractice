const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../dbfiles/user');
const { clientID } = require('../dbfiles/dbConfig');
const { clientSecret } = require('../dbfiles/dbConfig');
const { callback } = require('../dbfiles/dbConfig');

const googleLogin = async (passport) => {
  passport.use(new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: callback,
    },
    // In the GoogleStrategy configuration
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            username: profile.emails[0].value,
          });
        }

        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ));
};
module.exports = googleLogin;
