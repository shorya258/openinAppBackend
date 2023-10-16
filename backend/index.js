const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
var cors = require("cors");
app.use(cors());

mongoDB();
app.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/addProfile"));
app.use("/api", require("./routes/findProfileByEmail"));
app.use("/api", require("./routes/authProfileByGoogle"));
app.get("/", (req, res) => {
  res.send("Hello worlddd");
});
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
