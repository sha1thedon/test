
// pages/api/todos.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const getToDos = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);

  } else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }

}
  
export const createToDo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
 if (req.method === 'POST') {
    const { text } = req.body;
    const todo = await prisma.todo.create({
      data: { text },
    });
   res.status(201).json(todo);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
