const Loan = require("../models/Loan");

// Rule-based approval system
const evaluateLoan = (creditScore, amount) => {
    if (creditScore >= 700 && amount <= 50000) {
        return "Approved";
    } else if (creditScore >= 600 && amount <= 30000) {
        return "Pending";
    }
    return "Rejected";
};

// @desc    Apply for a loan
// @route   POST /api/loans/apply
// @access  Private
const applyLoan = async (req, res) => {
    try {
        const { amount, duration, creditScore } = req.body;

        // Validate input
        if (!amount || !duration || !creditScore) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if req.user exists
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const status = evaluateLoan(creditScore, amount);

        const loan = new Loan({
            user: req.user._id,
            amount,
            duration,
            creditScore,
            status,
        });

        const savedLoan = await loan.save();
        res.status(201).json(savedLoan);
    } catch (error) {
        console.error("Error applying for loan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// @desc    Get Loan Status
// @route   GET /api/loans/:id
// @access  Private
const getLoanStatus = async (req, res) => {
    try {
        const loanId = req.params.id;

        // Validate loan ID
        if (!loanId) {
            return res.status(400).json({ message: "Loan ID is required" });
        }

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.json(loan);
    } catch (error) {
        console.error("Error fetching loan status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { applyLoan, getLoanStatus };
