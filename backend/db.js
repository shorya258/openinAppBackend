const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://foodiez:foodiez@cluster0.jlauqxw.mongodb.net/openInApp?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected successfully");
  } catch (err) {
    console.log(err);
  }
};
mongoose.set("strictQuery", true);

module.exports = connectToMongo;
