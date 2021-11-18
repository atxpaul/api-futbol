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

      const listItems = $('.list-resultado');
      listItems.each(function (idx, el) {
        if ($(el).text().indexOf('Deportivo') > 0) {
          result = $(el)
            .text()
            .replace(/(\r\n|\n|\r)/gm, '')
            .trim();
        }
      });

      let gameMatch = result.split('                    ');

      if (gameMatch[0] == 'Deportivo') {
        match.riazor = true;
        match.rival = gameMatch[2];
      } else {
        match.riazor = false;
        match.rival = gameMatch[0];
      }
      match.result = gameMatch[1];

      let calendar = gameMatch[3].trim();

      match.day = `${calendar.substr(2, 5)}/${
        calendar.substr(5, 2) > 5 ? 2021 : 2022
      }`;
      match.hour = calendar.substr(8, 5);

      let goals = gameMatch[1].split(' - ');

      if (goals[0] == goals[1]) {
        match.winner = 'Draw';
      } else if (
        (match.riazor && goals[0] > goals[1]) ||
        (!match.riazor && goals[1] > goals[0])
      ) {
        match.winner = 'Dépor';
      } else if (gameMatch[1] == '-') {
        match.winner = 'Pending';
      } else if (gameMatch[1] == 'Aplaz.') {
        match.winner = 'Dépor';
        match.result = '3 - 0';
      } else {
        match.winner = match.rival;
      }

      matchSeries.push(match);
    }
    console.log('Scraped');

    return matchSeries;
  };
}

export default Scrap;
