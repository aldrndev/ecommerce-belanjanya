if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { createServer } = require("node:http");
const app = express();
const server = createServer(app);
const PORT = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const { setupSocket } = require("./config/socket");

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(router);
app.use(errorHandler);

const io = setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
