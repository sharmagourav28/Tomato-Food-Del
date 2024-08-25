import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { json } from "express";

//  login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	console.log("login", req.body);
	try {
		const user = await userModel.findOne({ email });
		console.log(user);
		if (!user) {
			return res.json({ success: false, message: "User Doesn't exist" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ success: false, message: "InValid Credentials" });
		}

		const token = createToken(user._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// register user

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};
const registerUser = async (req, res) => {
	const { name, password, email } = req.body;
	console.log("register", req.body);
	// Check if email is null or undefined
	if (!email) {
		return res
			.status(400)
			.json({ success: false, message: "Email is required" });
	}

	try {
		// Check if user is already registered
		const exists = await userModel.findOne({ email });
		if (exists) {
			return res;
			json({ success: false, message: "User already exists" });
		}

		// Validate email format
		if (!validator.isEmail(email)) {
			return res
				.status(400)
				.json({ success: false, message: "Please enter a valid email" });
		}

		// Validate password strength
		if (password.length < 8) {
			return res.status(400).json({
				success: false,
				message: "Please enter a strong password (at least 8 characters)",
			});
		}

		// Hash user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();
		const token = createToken(user._id);
		res.status(201).json({ success: true, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export { loginUser, registerUser };
