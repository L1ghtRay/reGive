import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/user-profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/user-profile.html'));
});

app.get('/donate', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/donate.html'));
});

app.get('/category', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/category.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

// Dummy
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


app.get('/api/admin/statistics', (req, res) => {
  res.json({
    totalUsers: users.length,
    totalItems: items.length,
    totalTransactions: transactions.length,
    totalReports: reports.length,
  });
});

app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

app.delete('/api/admin/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).send();
});

app.get('/api/admin/items', (req, res) => {
  res.json(items);
});

app.delete('/api/admin/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});

app.get('/api/admin/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/api/admin/reports', (req, res) => {
  res.json(reports);
});

app.post('/api/admin/reports/:id/resolve', (req, res) => {
  const id = parseInt(req.params.id);
  reports = reports.filter(report => report.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
