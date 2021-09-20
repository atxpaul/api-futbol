//config/routes.js
import MatchController from './../src/controllers/MatchController';

export default (server) => {
  // POST ROUTES
  server.get(`/api/match`, MatchController.getAll);
};
