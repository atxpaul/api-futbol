import cheerio from 'cheerio';
import axios from 'axios';
import config from '../../config/config.js';

class Scrap {
  constructor() {}

  getData = async () => {
    const matchSeries = [];
    // let match = new Match();
    console.log('Scraping');
    for (let matchId = 1; matchId <= 38; matchId++) {
      let match = { matchId: matchId };
      const pageContent = await axios.get(`${config.url}${matchId}`);
      const $ = cheerio.load(pageContent.data);
      let result;

      //console.log(`Jornada ${matchId}`);
      const listItems = $('.list-resultado');
      listItems.each(function (idx, el) {
        if ($(el).text().indexOf('Deportivo') > 0) {
          result = $(el)
            .text()
            .replace(/(\r\n|\n|\r)/gm, '')
            .trim();
        }
      });
      //console.log(result);
      let gameMatch = result.split('                    ');
      //console.log(gameMatch);
      if (gameMatch[0] == 'Deportivo') {
        match.riazor = true;
        match.rival = gameMatch[2];
      } else {
        match.riazor = false;
        match.rival = gameMatch[0];
      }
      match.result = gameMatch[1];

      let calendar = gameMatch[3].trim();
      //console.log(calendar);
      match.day = `${calendar.substr(2, 5)}/${
        calendar.substr(5, 2) > 5 ? 2021 : 2022
      }`;
      match.hour = calendar.substr(8, 5);

      // let day = match.day.split('/');
      // match.datetime = `${day.reverse().join('/')} ${match.hour}`;
      // const date = new Date(match.datetime);
      // console.log(date, match.datetime);

      //console.log(`El partido es el ${day} a las ${hour}`);

      let goals = gameMatch[1].split(' - ');
      //console.log(goals);

      if (goals[0] == goals[1]) {
        //console.log('Empató el Dépor');
        match.winner = 'Draw';
      } else if (
        (match.riazor && goals[0] > goals[1]) ||
        (!match.riazor && goals[1] > goals[0])
      ) {
        //console.log('Ganó el Dépor!');
        match.winner = 'Dépor';
      } else if (gameMatch[1] == '-') {
        //console.log('El partido no se jugó todavía');
        match.winner = 'Pending';
      } else if (gameMatch[1] == 'Aplaz.') {
        //console.log('Aplazado');
        match.winner = 'Dépor';
        match.result = '3 - 0';
      } else {
        //console.log('Perdió el Dépor');
        match.winner = match.rival;
      }
      //console.log(match);
      matchSeries.push(match);
    }
    console.log('Scraped');
    //console.log(matchSeries);

    //TODO: Tenemos que insertar todos los partidos y, si existen, actualizarlos.
    return matchSeries;
  };
}

export default Scrap;
