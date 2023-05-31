const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://uplborder.live/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({ googleId: profile.id });

      if (!currentUser) {
        const newUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: {
            firstName: profile.name.givenName,
            middleName: profile.name.middleName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
          },
          profilePhoto: profile.photos[0].value,
        }).save();
        return done(null, newUser);
      }

      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
