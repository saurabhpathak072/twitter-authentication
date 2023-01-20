const { default: mongoose } = require("mongoose");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const User = require("../API/models/user");

const authTwitterSetup = () => {
  // serialize the user.id to save in the cookie sessions
  // so the browser will remember the user when login
  passport.serializeUser((user, done) => {
    done(null, user.user.id);
  });

  // deserialize the cookieUserId to user in the databse
  passport.deserializeUser((id, done) => {

    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(new Error("Failed to deserialize an user"));
      });
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/redirect",
      },
      async (token, tokenSecret, profile, done) => {
        // find current user in UserModel
        const currentUser = await User.findOne({
          twitterId: profile._json.id_str,
        });
        // create new user if the database doesn't have this user
        if (!currentUser) {
          const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            name: profile._json.name,
            screenName: profile._json.screen_name,
            twitterId: profile._json.id_str,
            profileImageUrl: profile._json.profile_image_url,
            followers_count: profile._json.followers_count,
            friends_count: profile._json.friends_count,
            statuses_count: profile._json.statuses_count
          }).save();
          if (newUser) {
            done(null, {user:newUser,token,tokenSecret});
          }
        }
        done(null, {user:currentUser,token,tokenSecret});
      }
    )
  );
};

module.exports = {
  authTwitterSetup,
};
