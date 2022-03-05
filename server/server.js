const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
// const cookieSession = require("cookie-session");
// const passport = require("passport");
const connectDB = require("./config/db");
const path = require("path");
const url = require("./config/url");

//Initialize the express app
const app = express();
app.use(cors({ origin: url.urlClient(), credentials: true }));
dotenv.config({ path: './config/.env' });


//Use and set the cookie session settings
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // This set the time duration for the cookie => 1 day
//     keys: [process.env.COOKIE_KEY],//The secret of the key
//   })
// );


//Initialize the use of passport+ session -> required for the passportGoogleSSO.js
// app.use(passport.initialize());
// app.use(passport.session());

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set the routes controller for each route 
// app.use("/auth",require("./routes/auth") );
app.use("/api/task", require("./routes/task"));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set a static folder
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log("not in production");
}

//Connect to DB 
connectDB();


//In order to add the google oauth an google cloud project is required at  https://console.cloud.google.com
// require("./config/passportGoogleSSO")(passport);

const PORT = process.env.PORT || "5000";

app.listen(
  PORT, () => {
    console.log(("Server running on " + PORT));
  }
)