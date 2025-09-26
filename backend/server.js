import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/users.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Make `user` available in all EJS views
app.use((req, res, next) => {
  res.locals.user = req.user; // accessible in all EJS templates as `user`
  // console.log('\n--------------\n', res.locals.user, '\n------------------\n');
  next();
});

// Serve static frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Connect to DB
connectDB();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);

        let user = await User.findOne({ email: profile._json.email });

        if (!user) {
          user = await User.create({
            name: profile._json.name,
            displayName: profile._json.given_name,
            email: profile._json.email,
            profile: profile._json.picture,
            setupComplete: false,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user.setupComplete) {
      return res.redirect("/initial-login");
    }
    res.redirect("/");
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

app.set("view engine", "ejs");

// Page Routes

app.get("/", (req, res) => {
  res.render("../frontend/views/home.ejs");
});

app.get("/category", (req, res) => {
  res.render("../frontend/views/category.ejs");
});

app.get("/donate", (req, res) => {
  res.render("../frontend/views/donate.ejs");
});

app.get("/user-profile", (req, res) => {
  res.render("../frontend/views/user-profile.ejs");
});

app.get("/initial-login", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  if (req.user.setupComplete) return res.redirect("/");
  res.render("../frontend/views/initial.ejs", { user: req.user });
});

// Post routes

app.post("/initial-login", async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  try {
    const { displayName, phone, address } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      displayName,
      phone,
      address,
      setupComplete: true,
    });

    res.redirect("/");
  } catch (err) {
    console.error("Error during initial setup:", err);
    res.status(500).send("Something went wrong during setup.");
  }
});

app.use("/api/admin", adminRoutes);
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
