const express = require("express");
const { applyLoan, getLoanStatus } = require("../controllers/loanController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", protect, applyLoan);
router.get("/:id", protect, getLoanStatus); // Fixed incorrect route

module.exports = router;
