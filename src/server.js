import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Maintenance Service API is running'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});