const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const app = express();
const aboutRouter = require("./routes/about");
const portfolioRouter = require("./routes/portfolio");
const projectDetailsRouter = require("./routes/projectDetails");
const contactRouter = require("./routes/contact");
const loginRouter = require("./routes/login");

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//allows for different domains to communicate
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.REACT_APP_PORTFOLIO_API],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    key: "user",
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: false
  })
)

app.use(aboutRouter);
app.use(contactRouter);
app.use(portfolioRouter);
app.use(projectDetailsRouter);
app.use(loginRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  require("dotenv").config();

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  
}

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port: ${process.env.PORT}`);
});
