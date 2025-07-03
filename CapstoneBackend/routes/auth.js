const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
  
const router = express.Router();
  
router.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ email: req.body.email, password: hashed });
    res.status(201).json({ message: "User registered" });
  });
  
  router.post("/login", async (req, res) => {
    console.log("Hello!")
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");
    console.log(user)
  
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid credentials");

                                            // revisit to input secret
    const token = jwt.sign({ id: user._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjYzYTAxMTA0YTFmNzNmOTdkOTc5OSIsImlhdCI6MTc1MTUzMTMyMCwiZXhwIjoxNzUxNTM0OTIwfQ.ypqJRDGNt9zGpoprdOFEsm0u8k-AB8QfRXipr8xbeO4", 
      { expiresIn: "1h" });
    res.json({ token });
  });
  
  module.exports = router;