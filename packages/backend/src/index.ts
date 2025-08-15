import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const socketPath = process.env.SOCKET_PATH || '/socket.io';

app.use(cors({ origin: corsOrigin }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const server = http.createServer(app);
const io = new Server(server, {
  path: socketPath,
  cors: { origin: corsOrigin },
});

io.on('connection', (socket) => {
  socket.on('ping', () => {
    socket.emit('pong');
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
