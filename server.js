const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
// const fileUpload = require("express-fileupload");
// const path = require("path");
// const Connection = require("./Sockets/connection");

const SurahRoutes = require("./routes/surah");
const AyahRoutes = require("./routes/ayah");



connectDB();

const app = express();
const socket_io = require("socket.io");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// app.use(express.static(__dirname + "/uploads"));
// app.use(fileUpload());

// routes
app.use("/api/surah",SurahRoutes);
app.use("/api/ayah",AyahRoutes);



var PORT = process.env.PORT || 5000;
const io = socket_io();
// Connection(app, io);
// Lead();
// AssignLead(io);
// DailyMidNightTask();
// Notification();

io.listen(
  app.listen(PORT, console.log(`server is running on the port is ${PORT}`))
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
