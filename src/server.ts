import { createServer } from 'http';
import { logApp } from './logger/withLogger';

export function initServer() {
  createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('With Love From @pabelebly', 'utf-8');
  }).listen(process.env.PORT);
  logApp.info(`Server running at http://127.0.0.1:${process.env.PORT}/`);
}
