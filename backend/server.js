const dotenv = require("dotenv").config()
const express = require("express")
const connectDB = require("./config/connectDB")
const mongoose = require("mongoose")
const Task = require("./models/taskModel")
const taskRoute = require("./routes/taskRoute")
const cors = require("cors")

const app = express()
const allowedOrigins = ['https://mern-task-myapp.onrender.com'];

// Middlware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cors({
//     origin: ["http://localhost:3000", "https://mern-task-myapp.onrender.com"]
// }))


app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use("/api/tasks", taskRoute)

// Routes
app.get("/", (req, res) => {
    res.send("Home Page...")
})





const PORT = process.env.PORT || 5000


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))
