require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/userRouter');
const categoryRouter = require("./routes/categoryRouter");
const corsMid = require('./middleware/cors')

const app = express();
app.use(cors());
app.use(corsMid);
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({ useTempFiles: true }));



//Routes
app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.use('/api',require('./routes/upload'))
app.use("/api", require("./routes/productRouter"));
// Connect to mongoDB

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {}, (err) => {
  if (err) throw err;
  console.log("Connected to MOngoDB");
});

// app.get("/", (req, res) => {
//   res.json({ msg: "Hello" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server  running on the port ", PORT);
});
