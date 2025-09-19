// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   completed: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Task", taskSchema);

// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   completed: Boolean,
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// export default mongoose.model("Task", taskSchema);

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
