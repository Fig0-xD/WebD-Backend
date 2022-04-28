require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongodbConnect = async () => {
	try {
		const response = await mongoose.connect(process.env.DATABASE_URL);
		console.log("Successfully connected to mongoDB");
	} catch (error) {
		console.log("Could not connect to mongoDB");
		console.error(error);
	}
};

mongodbConnect();

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => console.log("Server started at port 3000!"));
