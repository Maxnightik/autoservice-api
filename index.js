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
app.use(express.json());

app.get('/api', async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, 'schedule.json'),
      'utf8',
    );
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Помилка під час читання файлу: ' + err);
  }
});

app.post('/api/orders', async (req, res) => {
  const newOrder = req.body;

  try {
    const ordersFilePath = path.join(__dirname, 'orders.json');

    let orders = await fs.readFile(ordersFilePath, 'utf8');
    orders = JSON.parse(orders);

    orders.push(newOrder);

    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 4), 'utf8');

    res.status(200).send('
Zakaz uspishno dodano
22 / 5 000
Замовлення успішно додано');
  } catch (err) {
    res.status(500).send('Помилка при записі файлу: ' + err);
  }
});

updateJsonFile();

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
