import cheerio from 'cheerio';
import axios from 'axios';
// import Match from '../models/match';
// import MatchService from './../services/MatchService';
// const matchService = new MatchService(new Match().getInstance());

exports.getData = async (url, matchId) => {
  // let match = new Match();
  const pageContent = await axios.get(url);
  const $ = cheerio.load(pageContent.data);
  let resultado;

  console.log(`Jornada ${matchId}`);
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

  let calendar = partido[3].trim();
  console.log(calendar);
  let day = calendar.substr(2, 5);
  let hour = calendar.substr(8, 5);
  console.log(`El partido es el ${day} a las ${hour}`);

  let goles = partido[1].split(' - ');
  console.log(goles);

  // match.id = matchId;
  // match.teamLocal = partido[0];
  // match.teamAway = partido[2];

  // match.score = goles;
  // match.date = day;

  if (goles[0] == goles[1]) {
    console.log('Empató el Dépor');
  } else if (
    (partido[0] == 'Deportivo' && goles[0] > goles[1]) ||
    (partido[2] == 'Deportivo' && goles[1] > goles[0])
  ) {
    //match.teamWinner = 'Depor';
    console.log('Ganó el Dépor!');
  } else if (partido[1] == '-') {
    console.log('El partido no se jugó todavía');
  } else {
    console.log('Perdió el Dépor');
  }
  // test = await Match.find({ match: matchId });
  // if (test) {
  //   await findOneAndUpdate({ match: matchId }, match);
  // } else {
  //   Match.save(match);
  // }

  // Match.findOne({ match: matchId }).exec(function (err, match) {
  //   if (err) {
  //     console.log(`No se encuentra partido`);
  //   }
  //   if (match) {
  //   } else {
  //     match.save((err, matchStored) => {
  //       if (err) {
  //         console.log('Error al guardar partido');
  //       }
  //     });
  //   }
  // });

  //TODO: Tenemos que insertar todos los partidos y, si existen, actualizarlos.
};
