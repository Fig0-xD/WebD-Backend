const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET request; get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET request; get users by id
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});

// POST request
router.post("/", async (req, res) => {
	let newUserId;

	// find user having highest userId
	try {
		const lastUser = await User.findOne().sort("-userId");
		if (lastUser == null) {
			newUserId = 1;
		} else {
			const lastUserId = lastUser.userId;
			newUserId = lastUserId + 1;
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

	const newUser = new User({
		userId: newUserId,
		name: req.body.name,
		role: req.body.role
	});

	try {
		const newUserResponse = await newUser.save();
		res.status(201).json(newUserResponse);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE request; delete user by id
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: "Deleted User " });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// middleware
async function getUser(req, res, next) {
	let user;

	try {
		user = await User.findOne({ userId: Number(req.params.id) });
		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (err) {
		return res.status(500).json({ message: error.message });
	}

	res.user = user;
	next();
}

module.exports = router;
