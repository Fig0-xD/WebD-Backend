require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const connectMongoose = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Successfully connected to MongoDB");
	} catch (err) {
		console.log("Couldn't connect to MongoDB");
		console.error(err);
	}
};

connectMongoose();

app.use(express.json());

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(3000, () => console.log("Server running at port 3000!"));
