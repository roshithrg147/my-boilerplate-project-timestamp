const express = require("express");
const app = express();

// Middleware to serve static files (if needed)
app.use(express.static("public"));

// Default route to handle requests without a date parameter
app.get("/api", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

// Route to handle requests with a date parameter
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
    // No date provided, use current date
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // If dateParam is a timestamp (e.g., 1451001600000)
    date = new Date(parseInt(dateParam));
  } else {
    // If dateParam is a string (e.g., "2015-12-25")
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
