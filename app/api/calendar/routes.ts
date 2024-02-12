import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'micro-cors';
const prisma = new PrismaClient();
const cors = Cors()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      const events = await prisma.calendarEvent.findMany();
      res.status(200).json(events);
    } else if (req.method === 'POST') {
      const { title, date, allDay, id, createdAt } = req.body;
      const newEvent = await prisma.calendarEvent.create({
        data: { title, date, id, createdAt },
      });
      res.status(201).json(newEvent);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }

  

