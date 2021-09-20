import express from 'express';
import bodyParser from 'body-parser';
const server = express();

import setRoutes from './routes';
setRoutes(server);

server.use(bodyParser.json());

export default server;
