import server from './config/server';
import scrap from './src/jobs/scrapScores';
import './config/database';

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`app running on port ${PORT}`);
  for (let i = 1; i <= 38; i++) {
    await scrap.getData(
      `https://resultados.as.com/resultados/futbol/primera_rfef/2021_2022/jornada/grupo_i_a_${i}/`,
      i
    );
  }
});
