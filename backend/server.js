import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/', (req, res) => {
  res.json({ message: 'Hello Homepage' });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
