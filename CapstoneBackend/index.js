const express = require("express");
  const mongoose = require("mongoose");
  
  const authRoutes = require("./routes/auth");
  const taskRoutes = require("./routes/tasks");
  
  mongoose.connect("mongodb+srv://naisyaz:1234@cluster0.llb16i0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    const app = express();
    // From my frontend (revisit to reconnect)
    //app.use(cors({
    //    origin: 
    //}))

    app.use(express.json());
  
    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);
  
    app.listen(3000, () => console.log("Task Manager API running on port 3000"));
  });