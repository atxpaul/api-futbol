import container from '../persistence/Container.js';
import Scrap from '../jobs/Scrap.js';

class DeporController {
  constructor() {
    this.storage = new container('.results');
  }

  scrapResult = async (req, res) => {
    this.scrapCore();

    res.json({ requestProcess: true });
  };

  scrapCore = async () => {
    const scrap = new Scrap();
    const matchSeries = await scrap.getData();

    if (matchSeries.length > 0) {
      console.log('Cleaning persistence');
      await this.storage.deleteAll();

      for (const match of matchSeries) {
        console.log('Saving match', match);
        await this.storage.save(match);
      }
    }
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
