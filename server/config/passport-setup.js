const passport = require("passport");
const TwitterStrategy = require("passport-twitter");

// serialize the user.id to save in the cookie sessions
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// deserialize the cookieUserId to user in the databse
passport.deserializeUser((id, done) => {
  const user = {
    name: "saurabh",
    screenName: "Pathak",
    twitterId: "12345",
    profileImageUrl: "test",
  };
  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      done(null, profile);
    }
  )
);
