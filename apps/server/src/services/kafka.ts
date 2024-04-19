import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import {config as configDotenv} from "dotenv"
import { PrismaClient } from '@prisma/client'
configDotenv();

const prismaClient = new PrismaClient();
const kafkaHost = process.env.KAFKA_HOST;
const kafkaUsername = process.env.KAFKA_USERNAME;
const kafkaPassword = process.env.KAFKA_PASSWORD;

const kafka = new Kafka({
  brokers: [`${kafkaHost}`],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  },
  sasl: {
    username: `${kafkaUsername}`,
    password: `${kafkaPassword}`,
    mechanism: "plain",
  },
});

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: string) {
  const producer = await createProducer();
  await producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "GROUPCHATS",
  });
  return true;
}

export async function startMessageConsumer() {
  const consumer = kafka.consumer({ groupId: "default" });
  await consumer.connect();
  await consumer.subscribe({ topic: "GROUPCHATS", fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;

      const messageString = message.value!.toString();
      const messageObject = JSON.parse(messageString);
      const { text, groupId: taskId, userId, userName } = messageObject.message;
      try {
        let groupId: string;
     
        // Check if the group already exists
        const existingGroup = await prismaClient.group.findFirst({
          where: {
            taskId: {
              equals: taskId
            }
          }
        });
       
        // If the group doesn't exist, create it
        if (!existingGroup) {
          const newGroup = await prismaClient.group.create({
            data: {
              taskId: taskId,
            },
          });
          groupId = newGroup.id;
        } else {
          groupId = existingGroup.id;
        }
      
        // Create the message
        const res = await prismaClient.message.create({
          data: {
            text: text,
            groupId: groupId,
            userId: userId,
            userName: userName,
          },
        });
      } catch (error) {
        console.log("Error in creating group or saving message to DB", error);
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: "GROUPCHATS" }]);
        }, 60 * 1000);
      }
    
    },
  });
}

export default kafka;
