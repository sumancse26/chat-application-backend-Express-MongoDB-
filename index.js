const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter.js");
const messageRouter = require("./router/messageRouter.js");

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: corsOptions, // Allow CORS for WebSocket
});

dotEnv.config();

app.use(cors(corsOptions));

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
}

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.get("/", async (req, res) => {
  res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
    users: `${req.protocol}://${req.get("host")}${req.originalUrl}users`,
  });
});

app.use(loginRouter);
app.use(usersRouter);
app.use(inboxRouter);
app.use(messageRouter);

// Socket.io Setup
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for new messages
  socket.on("sendMessage", (data) => {
    console.log("New message:", data);

    // Emit the message to all clients (broadcast)
    io.emit("message", data);
    io.emit("conversation", data);
  });

  // Listen for user typing events
  socket.on("typing", (data) => {
    socket.broadcast.emit("userTyping", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
