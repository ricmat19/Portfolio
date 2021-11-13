const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const portfolioRouter = require("./routes/portfolio");
const projectDetailsRouter = require("./routes/projectDetails");
const contactRouter = require("./routes/contact");

//allows for different domains to communicate
app.use(cors());

app.use(express.urlencoded({ extended: false }));

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

app.use(homeRouter);
app.use(aboutRouter);
app.use(contactRouter);
app.use(portfolioRouter);
app.use(projectDetailsRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port: ${process.env.PORT}`);
});
