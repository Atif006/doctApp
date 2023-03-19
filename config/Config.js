const mongoose = require("mongoose");
const colors = require("colors");
const dbConnect = async () => {
  const url =
    "mongodb+srv://Irfan06Md:Mongo2023@trialdb.0qhcvgi.mongodb.net/DoctApp";
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDb server started.${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`MongoDb Server :${error}`.bgRed.yellow);
  }
};
module.exports = dbConnect;

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// mongoose.connect(
//   "mongodb+srv://Irfan06Md:Mongo2023@trialdb.0qhcvgi.mongodb.net/DoctApp"
// );
