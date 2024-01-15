const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../dbfiles/user');

const googleLogin = async (passport) => {
  passport.use(new GoogleStrategy(
    {
      clientID: '346812985840-3t6icq052sbr0g80pbd7ejdt8ergb0s2.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/auth/google/callback',
    },
    // In the GoogleStrategy configuration
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // User not found by Google ID, try finding by email
          user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            // No user with this email, create a new one
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              // username can be same as email or derived from profile info
              username: profile.emails[0].value,
              // Additional fields like 'age' can be added if available
            });
          } else {
            // User found by email, add googleId to existing user
            user.googleId = profile.id;
            await user.save();
          }
        }

        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ));
};
module.exports = googleLogin;
