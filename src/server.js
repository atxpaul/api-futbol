import express from 'express';

import Scrap from './jobs/Scrap.js';

const app = express();

const scrap = new Scrap();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.json({
    error: -2,
    description: `Route ${req.url} not implemented`,
  });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  for (let i = 1; i <= 38; i++) {
    scrap.getData(
      `https://resultados.as.com/resultados/futbol/primera_rfef/2021_2022/jornada/grupo_i_a_${i}/`,
      i
    );
  }
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
