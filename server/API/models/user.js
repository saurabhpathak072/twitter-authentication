const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
});

const User = mongoose.model("User",userSchema);

module.exports = User;