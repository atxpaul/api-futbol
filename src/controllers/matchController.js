import Controller from './Controller';
import MatchService from './../services/MatchService';
import Match from './../models/Match';
const matchService = new MatchService(new Match().getInstance());

class MatchController extends Controller {
  constructor(service) {
    super(service);
  }
  async getMatch(req, res) {
    return res.status(200).send(await this.service.getMatch(req.query));
  }
}

export default new MatchController(matchService);
