import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    type: {
      type: String,
      enum: ["RENEWAL", "EXTENSION", "SUKLILOAN"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

notificationSchema.index({ clientId: 1, type: 1 }, { unique: true });

export default mongoose.model("Notification", notificationSchema);
