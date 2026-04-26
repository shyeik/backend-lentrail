import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    lastName: String,
    firstName: String,
    middleName: String,
    suffix: String,
    birthday: Date,
    age: Number,
    pensionType: String,
    loanType: String,
    pensionAmount: Number,
  },
  { timestamps: true }, // 🔥 ADD THIS
);

export default mongoose.model("Client", clientSchema);
