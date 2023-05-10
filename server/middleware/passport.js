const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// const Web3 = require('web3');
// const web3 = new Web3();

const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({ googleId: profile.id });

      if (!currentUser) {
        //TODO check what role is, student, issuer, adviser, then assign role

        //TODO check what role is before assigning encryptedJson
        // const masterPrivateKey = process.env.PRIVATE_KEY;
        // const wallet = web3.eth.accounts.create();
        // const address = web3.eth.accounts.privateKeyToAccount(masterPrivateKey).address;
        // const encryptedJson = web3.eth.accounts.encrypt(masterPrivateKey, process.env.PASSWORD);

        const newUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          middleName: profile.name.middleName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          profilePhoto: profile.photos[0].value,
          student: null,
          // encryptedJson: encryptedJson
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
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
