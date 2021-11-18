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

const server = app.listen(PORT, async () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  const matchSeries = await scrap.getData();
  let lastMatch = {};
  for (let matchId = 1; matchId <= 38; matchId++) {
    let game = matchSeries[matchId];
    if (game.winner == 'Pending' && matchId > 1) {
      break;
    }
    lastMatch.winner = game.winner;
    lastMatch.rival = game.rival;
    lastMatch.result = game.result;
  }
  console.log(
    `El último partido el Dépor ${
      lastMatch.winner == 'Dépor' ? 'ganó' : 'perdió'
    } contra el ${lastMatch.rival} por ${lastMatch.result}`
  );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
