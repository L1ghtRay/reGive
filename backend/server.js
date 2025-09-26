import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminroutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

connectDB();

app.set("view engine", "ejs");

// Login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/user-profile");
  }
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.render("../frontend/views/home.ejs");
});

app.get("/admin", (req, res) => {
  res.render("../frontend/views/admin.ejs");
});

app.get("/category", (req, res) => {
  res.render("../frontend/views/category.ejs");
});

app.get("/donate", (req, res) => {
  res.render("../frontend/views/donate.ejs");
});

app.get("/reg", (req, res) => {
  res.render("../frontend/views/reg.ejs");
});

app.get("/user-profile", (req, res) => {
  res.render("../frontend/views/user-profile.ejs");
});

app.use("/api/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
