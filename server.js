const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// const path = require("path");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

const SurahRoutes = require("./routes/surah");
const AyahRoutes = require("./routes/ayah");
const UserRoutes = require("./routes/user");
const AuthRoutes = require("./routes/auth");

connectDB();

const app = express();
const socket_io = require("socket.io");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/uploads"));
app.use(fileUpload());


// routes for front end build
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/", (req, res) =>
//     res.sendFile(path.join(__dirname, "build", "index.html"))
// );
// app.get("/login", (req, res) =>
//     res.sendFile(path.join(__dirname, "build", "index.html"))
// );

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/surah",SurahRoutes);
app.use("/api/ayah",AyahRoutes);
app.use("/api/user",UserRoutes);


var PORT = process.env.PORT || 5000;
const io = socket_io();

io.listen(
  app.listen(PORT, console.log(`server is running on the port is ${PORT}`))
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
