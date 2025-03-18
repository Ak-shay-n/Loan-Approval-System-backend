const mongoose = require("mongoose");

const loanSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number, // Duration in months
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        creditScore: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
