//handling uncaught exceptions, if something is undefined/uncaught then this will handled
process.on("uncaughtException", (err) => {
  console.log(
    `server is shutting down due to uncaught exception: ${err.message}`
  );
});
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const colors = require("colors");
const webpush = require("web-push");
// routes
const productRoutes = require("./routes/Products");
const userRoutes = require("./routes/Auth");
const orderRoutes = require("./routes/Orders");
const errorMiddleware = require("./middleware/error");
const path = require("path");
// define app
const app = express();
// const publicDir = path.join(__dirname,'/public');
// app.use(express.static(publicDir));
//db
const connectDB = require("./config/db");
connectDB();
//port
const PORT = 8080;

app.use(express.json());
//cors
app.use(cors());
// You can generate VAPID keys using the command:
// ./node_modules/.bin/web-push generate-vapid-keys**
webpush.setVapidDetails(
  "mailto: `http://precisionordnance.com.au/`",
  "BDoTumj2UX0sR8Vwq5rRZo8JzWlz_WVUXcKUIcJFKBJbRBdbuGkPERc_SHvJLDNL4o7c1Gc05HHoUGCGa-40EN4",
  "phFI9iakLqG1aIV_h7jSRBKKtImw9uRQVkJhK8ZgJ08"
);

app.get("/", (req, res) => {
  res.send("welcome to markosis");
});
// notify
app.post("/notifications/subscribe", (req, res) => {
  // console.log(req.body);
  const payload = JSON.stringify({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  console.log(req.user);
  webpush
    .sendNotification(req.body.subscription, payload)
    .then((result) => console.log())
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});
//routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", require("./routes/Upload"));
app.use("/api/subscribe", require("./routes/Subscribe"));
app.use("/api/contactus", require("./routes/ContactUs"));
//notification
app.use("/api/notifi", require("./routes/Foreground"));
//Gallery
app.use("/api/gallery", require("./routes/ImageGallery"));
app.use("/api/ContactUs", require("./routes/ContactUs"));
app.use("/api/RequestStock", require("./routes/RequestStock"));

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

// GOOGLE_CLIENT_ID=330206588934-oms6fm52brbqfk1jjjpk8v3adkt80fpa.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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
// OAUTH_PLAYGROUND_REFRESH_TOKEN=1//0443ZTC3Hr5xsCgYIARAAGAQSNwF-L9IrXSF7UbkjcpILOH0LHSVKt2bpr9MOwf-4v_6hWOM12MqfTLJwBw63Eq0SKPKFnQ7Fls4
//unhandled promise rejection handling
process.on("unhandledRejection", (err) => {
  console.log(
    "shutting down server due to unhandled promise rejection. Error: " +
      err.message
  );
  server.close(() => {
    process.exit(1);
  });
});
