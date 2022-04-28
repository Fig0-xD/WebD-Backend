const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
	name: {
		type: String,
		required: true
	},
	role: {
		type: String,
        enum: ["Admin", "Basic"],
		default: "Basic"
	}
});

module.exports = mongoose.model("User", userSchema);
