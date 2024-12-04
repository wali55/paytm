const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (account?.balance) {
    return res.status(200).json({ balance: account?.balance });
  } else {
    return res.status(400).json({ msg: "Could not show the balance" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { to, amount } = req.body;

    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ msg: "Invalid transfer amount." });
    }

    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < numAmount) {
      return res.status(400).json({ msg: "Insufficient balance." });
    }

    // Find recipient's account
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      return res.status(400).json({ msg: "Invalid recipient account." });
    }
    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -numAmount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: numAmount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ msg: "Balance transfer successful!" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log("error", error);
    return res.status(500).json({ msg: "Could not transfer balance!" });
  }
});

module.exports = router;
