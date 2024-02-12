// pages/api/notes.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNotes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const notes = await prisma.note.findMany();
    res.status(200).json(notes);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export const createNote = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { Content } = req.body;
    const note = await prisma.note.create({
      data: { 
        Content },
    });
    res.status(201).json(note);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
