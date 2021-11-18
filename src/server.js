import express from 'express';

import deporRouter from './router/deporRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/depor', deporRouter);

app.use((req, res) => {
  res.json({
    error: -2,
    description: `Route ${req.url} not implemented`,
  });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
