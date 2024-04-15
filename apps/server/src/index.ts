import express, { Request, Response } from 'express';
import http from 'http';
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
import prismaClient from "./services/prisma";
import cors from 'cors'

async function init() {
  startMessageConsumer();
  const socketService = new SocketService();

  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  app.use(express.json());
  app.use(cors());
  // Route to get messages for a particular group
  app.get('/api/messages', async (req: Request, res: Response) => {
    try {
      const { taskId } = req.query;
      const group = await prismaClient.group.findFirst({
        where: { taskId: taskId as string },
      });
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      const messages = await prismaClient.message.findMany({
        where: { groupId: group.id },
        orderBy: { createdAt: 'asc' },
      });
  
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () =>
    console.log(`HTTP Server started at PORT:${PORT}`)
  );

  socketService.initListeners();
}

init();
