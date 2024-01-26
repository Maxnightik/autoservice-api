import { updateJsonFile } from './updateJsonFile.js';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(cors());

app.get('/api', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, 'schedule.json'),
      'utf8',
    );
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Ошибка при чтении файла: ' + err);
  }
});

updateJsonFile();

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
