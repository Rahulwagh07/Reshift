import express, { Request, Response } from 'express';
import http from 'http';
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
import prismaClient from "./services/prisma";

async function init() {
  startMessageConsumer();
  const socketService = new SocketService();

  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  app.use(express.json());

  // Route to get messages for a particular group
  app.post('/api/messages', async (req: Request, res: Response) => {
    try {
      const {groupId} = req.body;
      const messages = await prismaClient.message.findMany({
        where: { groupId },
        orderBy: { createdAt: 'asc' }, 
      });
      res.json(messages);
    } catch (error) {
      console.error('Error to fetch messages', error);
      res.status(500).json({ error: 'server error' });
    }
  });

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () =>
    console.log(`HTTP Server started at PORT:${PORT}`)
  );

  socketService.initListeners();
}

init();
