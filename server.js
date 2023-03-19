const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnect = require("./config/Config");
const router = require("./routes/UserRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(morgan("dev"));
dbConnect();
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/UserRoutes"));
app.use("/", require("./routes/AdminRoutes"));
app.use("/", require("./routes/DoctorsRaouts"));

// app.post("/register");
let port = process.env.PORT || 8080;
app.listen(process.env.PORT, () => {
  console.log(
    `Server is Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT} port No ${port}`
  );
});

// const express = require("express");
// require("./config/Config");
// const User = require("./models/UserModels");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.post("/register", async (request, response) => {
//   let user = new User(request.body);
//   const result = await user.save();
//   response.send(result);
// });

// app.listen(5000);
