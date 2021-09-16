import cheerio from 'cheerio';
import axios from 'axios';

exports.getData = async (url) => {
  const pageContent = await axios.get(url);
  const $ = cheerio.load(pageContent.data);
  let resultado;
  const listItems = $('.list-resultado');
  listItems.each(function (idx, el) {
    if ($(el).text().indexOf('Deportivo') > 0) {
      resultado = $(el)
        .text()
        .replace(/(\r\n|\n|\r)/gm, '')
        .trim();
    }
  });
  console.log(resultado);
  let partido = resultado.split('                    ');
  console.log(partido);

  let goles = partido[1].split(' - ');
  console.log(goles);

  if (goles[0] == goles[1]) {
    console.log('Empató el Dépor');
  } else if (
    (partido[0] == 'Deportivo' && goles[0] > goles[1]) ||
    (partido[2] == 'Deportivo' && goles[1] > goles[0])
  ) {
    console.log('Ganó el Dépor!');
  } else {
    console.log('Perdió el Dépor');
  }
};
