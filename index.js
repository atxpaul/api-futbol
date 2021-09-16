import server from './config/server';
import scrap from './src/jobs/scrap';

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
  scrap.getData(
    'https://resultados.as.com/resultados/futbol/primera_rfef/2021_2022/jornada/grupo_i_a_1/'
  );
  scrap.getData(
    'https://resultados.as.com/resultados/futbol/primera_rfef/2021_2022/jornada/grupo_i_a_2/'
  );
  scrap.getData(
    'https://resultados.as.com/resultados/futbol/primera_rfef/2021_2022/jornada/grupo_i_a_3/'
  );
});
