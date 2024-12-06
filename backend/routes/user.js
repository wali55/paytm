const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware/middleware");
const bcrypt = require("bcrypt");

const userSchema = z.object({
  username: z.string().email().trim().toLowerCase(),
  firstName: z.string().trim().max(30),
  lastName: z.string().trim().max(30),
  password: z.string().min(6),
});

const userUpdateSchema = z.object({
  firstName: z.string().trim().max(30).optional(),
  lastName: z.string().trim().max(30).optional(),
  password: z.string().min(6).optional(),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  const userValidation = userSchema.safeParse({
    username,
    firstName,
    lastName,
    password,
  });

  const hash = await bcrypt.hash(password, 10);

  if (userValidation.success) {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(411).json({ msg: "User already exists!" });
    }
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: hash,
    });

    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.round(Math.random() * 1000),
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res.status(201).json({
      msg: "User created successfully!",
      newUser,
      token: `Bearer ${token}`,
    });
  } else {
    return res.status(400).json({ msg: "Wrong input" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials!" });
  }

  const isMatched = await bcrypt.compare(password, user?.password);

  if (!isMatched) {
    return res.status(400).json({ msg: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return res.status(200).json({ token: `Bearer ${token}` });
});

router.put("/", authMiddleware, async (req, res) => {
  const { password, firstName, lastName } = req.body;

  const userUpdateValidation = userUpdateSchema.safeParse({
    firstName,
    lastName,
    password,
  });

  try {
    if (userUpdateValidation.success) {
      await User.findOneAndUpdate(
        { _id: req?.userId },
        { $set: { password, firstName, lastName } }
      );
      return res.status(200).json({ msg: "User updated successfully" });
    } else {
      return res.status(400).json({ msg: "User is not updated" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "User is not updated" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const searchedText = req.query["filter"] || "";
  const users = await User.find({
    $and: [
      { _id: { $ne: req?.userId } },
      {
        $or: [
          { firstName: { $regex: searchedText, $options: "i" } },
          { lastName: { $regex: searchedText, $options: "i" } },
        ],
      },
    ],
  });
  res.json({
    returnedUsers: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
