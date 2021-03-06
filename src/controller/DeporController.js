import container from '../persistence/Container.js';
import Scrap from '../jobs/Scrap.js';

class DeporController {
  constructor() {
    this.storage = new container('.results');
    this.isScraping = false;
  }

  scrapResult = async (req, res) => {
    if (this.isScraping == false) {
      console.log('As isScraping is false, going to scrap');
      this.scrapCore();
      res.json({ requestProcess: true });
    } else {
      console.log('As isScraping is false, NOT going to scrap');
      res.json({ requestProcess: false });
    }
  };

  scrapCore = async () => {
    const scrap = new Scrap();
    this.isScraping = true;
    const matchSeries = await scrap.getData();

    if (matchSeries.length > 0) {
      console.log('Cleaning persistence');
      await this.storage.deleteAll();

      for (const match of matchSeries) {
        console.log('Saving match', match);
        await this.storage.save(match);
      }
    }
    this.isScraping = false;
  };

  getResult = async (req, res) => {
    const matchSeries = await this.storage.getAll();
    let lastMatch = {};
    let nextMatch = {};
    if (matchSeries.length > 0) {
      for (let matchId = 1; matchId <= 38; matchId++) {
        let game = matchSeries[matchId];
        if (game.winner == 'Pending' && matchId > 1) {
          nextMatch.rival = game.rival;
          nextMatch.riazor = game.riazor;
          nextMatch.day = game.day;
          nextMatch.hour = game.hour;
          break;
        }
        lastMatch.winner = game.winner;
        lastMatch.rival = game.rival;
        lastMatch.result = game.result;
      }
    }
    return res.json([lastMatch, nextMatch]);
  };
}

export default DeporController;
