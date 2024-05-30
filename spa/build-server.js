const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist/spa/browser")));

// Catch all routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/spa/browser/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});