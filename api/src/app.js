require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./models/db");
const { createInitialAdmin } = require("./utils/createInitialAdmin");
const { initializeScheduledTasks } = require('./utils/scheduledTasks');

const userRoutes = require("./routes/user.routes");
const employeeRoutes = require("./routes/employee.routes");
const evaluationRoutes = require("./routes/evaluation.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const reportRoutes = require('./routes/report.routes');
const notificationRoutes = require('./routes/notification.routes');

const PORT = process.env.PORT || 3000;

const createApp = async () => {
  const app = express();

  const allowedOrigins = ["http://localhost:5173"];

  app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  // Connect to MongoDB
  try {
    await connectDB();
    console.log("Connected to MongoDB");
    
    // Create initial admin user
    await createInitialAdmin();

    // Initialize scheduled tasks
    initializeScheduledTasks();
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }

  // Routes
  app.use("/api/auth", userRoutes);
  app.use("/api/employees", employeeRoutes);
  app.use("/api/evaluations", evaluationRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/notifications', notificationRoutes);

  app.get("/", (req, res) => {
    res.send("Welcome to Remote360 API!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = createApp;