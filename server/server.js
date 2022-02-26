require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const { imageRouter } =require("./routes/imageRouter");
const { userRouter } =require("./routes/userRouter");

const app = express();
const { MONGO_URI,PORT } = process.env;

mongoose.connect(MONGO_URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
)
.then(() => {
    console.log("MongoDB Connected.")
    app.use("/uploads", express.static("uploads")); // 클라이언트에서 접속이 된다.
    app.use(express.json());
    app.use("/image", imageRouter);
    app.use("/users", userRouter);
    app.listen(PORT,() => console.log("Express server listening on PORT " + PORT));
})
.catch((err) => console.log(err));

