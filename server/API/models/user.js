const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  followers_count:Number,
  friends_count:Number,
  statuses_count:Number
});

const User = mongoose.model("User",userSchema);

module.exports = User;