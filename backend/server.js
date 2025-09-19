// // // import express from "express";
// // // import mongoose from "mongoose";
// // // import dotenv from "dotenv";
// // // import cors from "cors";
// // // import taskRoutes from "./routes/tasks.js";

// // // dotenv.config();

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // Test route for "/"
// // // app.get("/", (req, res) => {
// // //   res.send("Backend is running!");
// // // });

// // // // MongoDB connection
// // // mongoose
// // //   .connect(process.env.MONGODB_URI)
// // //   .then(() => console.log("Connected to MongoDB Atlas"))
// // //   .catch((err) => console.error("MongoDB connection error:", err));

// // // // Use the task routes
// // // app.use("/tasks", taskRoutes);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () =>
// // //   console.log(`Server running on http://localhost:${PORT}`)
// // // );

// // import express from "express";
// // import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import bodyParser from "body-parser"; // <-- import body-parser
// // import taskRoutes from "./routes/tasks.js";

// // dotenv.config();

// // const app = express();
// // app.use(cors());

// // // Use body-parser middleware
// // app.use(bodyParser.json()); // parses JSON request bodies
// // app.use(bodyParser.urlencoded({ extended: true })); // parses URL-encoded bodies

// // // Test route for "/"
// // app.get("/", (req, res) => {
// //   res.send("Backend is running!");
// // });

// // // MongoDB connection
// // mongoose
// //   .connect(process.env.MONGODB_URI)
// //   .then(() => console.log("Connected to MongoDB Atlas"))
// //   .catch((err) => console.error("MongoDB connection error:", err));

// // // Use the task routes
// // app.use("/tasks", taskRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () =>
// //   console.log(`Server running on http://localhost:${PORT}`)
// // );

// // import express from "express";
// // import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import taskRoutes from "./routes/tasks.js";
// // import authRoutes from "./routes/auth.js";

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.use("/auth", authRoutes); // <-- add this
// // app.use("/tasks", taskRoutes);

// // app.get("/", (req, res) => {
// //   res.send("Backend is running with authentication!");
// // });

// // mongoose
// //   .connect(process.env.MONGODB_URI)
// //   .then(() => console.log("Connected to MongoDB Atlas"))
// //   .catch((err) => console.error("MongoDB connection error:", err));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // import express from "express";
// // import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import cors from "cors";

// // import taskRoutes from "./routes/tasks.js";
// // import authRoutes from "./routes/auth.js"; // ✅ import your auth routes

// // dotenv.config();
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use("/tasks", taskRoutes);
// // app.use("/auth", authRoutes); // ✅ mount auth routes

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () =>
// //   console.log(`Server running on http://localhost:${PORT}`)
// // );

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import taskRoutes from "./routes/tasks.js";
// import authRoutes from "./routes/auth.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/tasks", taskRoutes);
// app.use("/auth", authRoutes);

// // Test route
// app.get("/", (req, res) => res.send("Backend is running!"));

// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB Atlas");
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// ✅ CORS setup for production frontend
app.use(
  cors({
    origin: ["https://c-t-m-sepia.vercel.app/"], // replace with your Vercel URL
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
