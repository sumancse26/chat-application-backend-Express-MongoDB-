const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/common/errorHandler.js");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter.js");
const messageRouter = require("./router/messageRouter.js");

const app = express();
dotEnv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static folder
if (process.env.NODE_ENV !== "production") {
  const staticPath = path.join(__dirname, "public");
  app.use(express.static(staticPath));
  console.log("Serving static files from:", staticPath);
}

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use(loginRouter);
app.use(usersRouter);
app.use(inboxRouter);
app.use(messageRouter);

//error handling
//common error handler
// app.use(errorHandler);
//404 not found
// app.use(notFoundHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
