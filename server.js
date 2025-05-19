const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Contact form route
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
      user: "kabirabbaalmustapha@gmail.com", // Replace with your email
      pass: "jodfzzpbbryhxlf" // Replace with your email password
    }
  });

  const mailOptions = {
    from: email,
    to: "kabirabbaalmustapha@gmail.com", // Replace with your email
    subject: `Message from ${name} - KAFAN Digitals`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send message.");
  }
});

// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
