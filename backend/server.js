import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/users.js";
import Item from "./models/items.js";
import adminRoutes from "./routes/adminroutes.js";
import donationRoutes from "./routes/donationroutes.js";
import itemRoutes from   "./routes/itemroutes.js";
import homeRoutes from "./routes/homeRoutes.js"; 


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define uploadDir BEFORE using it-images
const uploadDir = path.join(__dirname, '..','uploads');

//Asiya
app.use((req,res,next)=>{
res.locals.currentUser=req.user ||null;
next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

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
  res.locals.user = req.user;
  next();
});

// Serve static frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Connect to DB
connectDB();

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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
        console.error("Google auth error:", err);
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

// Auth Routes
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

// Set view engine
app.set("view engine", "ejs");

// Page Routes
/*
app.get("/", (req, res) => {
  res.render("../frontend/views/home.ejs");
});*/
app.set('views', path.join(__dirname, '..', 'frontend', 'views'));

app.get("/category", (req, res) => {
  res.render("category.ejs");
});

app.get("/admin", (req, res) => {
  res.render("../frontend/views/admin.ejs");
});

app.get("/donate", (req, res) => {
  res.render("donate.ejs");
});

app.get("/user-profile", (req, res) => {
  res.render("user-profile.ejs");
});

app.get("/catalog",(req,res)=>{
  res.render("catalog.ejs")
})


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

    // Validate required fields
    if (!displayName || !phone || !address) {
      return res.status(400).send("All fields are required");
    }

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

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api", donationRoutes);
app.use("/api",itemRoutes)
app.use("/", homeRoutes);

// for images 

app.use('/uploads', express.static(uploadDir));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});