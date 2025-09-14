import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import connectDB from './config/db.js';
import Admin from './models/admin.js';
import Category from './models/categories.js';
import Item from './models/items.js';
import Message from './models/message.js';
import Recommendation from './models/recommendations.js';
import Report from './models/reports.js';
import Request from './models/requests.js';
import Transaction from './models/transaction.js';
import UserModel from './models/users.js';
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Connect to DB
connectDB();

// Login
app.get("/auth/google", passport.authenticate('google', { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: "/" }), (req, res) => {
  res.redirect('/user-profile')
});

app.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect("/")
  });
})

// CREATED FOR TRIAL ONLY (DB CONNECTION CHECK)
app.post("/api/admins", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: "Category created successfully", category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/recommendations", async (req, res) => {
  try {
    const newRecommendation = new Recommendation(req.body);
    const savedRecommendation = await newRecommendation.save();
    res.status(201).json(savedRecommendation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/reports", async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/requests", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

//

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/home.html'));
});

app.get('/user-profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/user-profile.html'));
});

// ... (other static routes remain same)


// --- Dummy data for statistics ---
let users = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com' },
];
let items = [
  { id: 1, name: 'Stationary Set', category: 'Stationary', status: 'Available' },
  { id: 2, name: 'Backpack', category: 'Bags', status: 'Used' },
];
let transactions = [
  { id: 1, username: 'John Doe', itemName: 'Stationary Set', date: '2025-08-01', amount: 0 },
  { id: 2, username: 'Alice Smith', itemName: 'Backpack', date: '2025-07-15', amount: 0 },
];
let reports = [
  { id: 1, username: 'John Doe', issue: 'Item not as described', reportDate: '2025-08-03' },
];

// --- Admin API ---
app.get('/api/admin/statistics', (req, res) => {
  res.json({
    totalUsers: users.length,
    totalItems: items.length,
    totalTransactions: transactions.length,
    totalReports: reports.length,
  });
});

app.get('/api/admin/users', (req, res) => res.json(users));

app.delete('/api/admin/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).send();
});

app.get('/api/admin/items', (req, res) => res.json(items));

app.delete('/api/admin/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});

app.get('/api/admin/transactions', (req, res) => res.json(transactions));

app.get('/api/admin/reports', (req, res) => res.json(reports));

app.post('/api/admin/reports/:id/resolve', (req, res) => {
  const id = parseInt(req.params.id);
  reports = reports.filter(report => report.id !== id);
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
