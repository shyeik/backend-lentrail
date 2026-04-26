import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    dateOfLoan: { type: Date, required: true },

    loanType: {
      type: String,
      enum: ["NEW", "RENEWAL", "EXTENSION", "SUKLILOAN"],
      required: true,
    },

    dsbNumber: { type: String },

    startMonth: { type: Date },
    endMonth: { type: Date },

    pension: { type: Number, default: 0 },
    monthlyAmort: { type: Number, default: 0 },
    change: { type: Number, default: 0 },

    // For NEW and RENEWAL
    loanTerm: { type: Number, default: 0 },

    // For EXTENSION
    extensionMonths: { type: Number, default: 0 },

    // Optional: saved final total after computation
    totalMonths: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
